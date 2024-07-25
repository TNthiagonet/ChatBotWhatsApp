const fs = require('fs').promises;

async function addScriptWithRetry(page, scriptPath, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await page.waitForLoadState('networkidle'); // Espera a página estar ociosa
      await page.waitForTimeout(2000); // Adiciona uma espera adicional
      await page.addScriptTag({ path: scriptPath }); // Adiciona o script à página
      console.log('Script adicionado com sucesso!');
      return;
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`O arquivo ${scriptPath} não existe.`);
      } else if (error.message.includes('Execution context was destroyed')) {
        console.error('Erro de contexto de execução, tentando novamente...', error);
        await page.waitForTimeout(1000); // Espera 1 segundo antes de tentar novamente
      } else {
        console.error('Erro ao adicionar o script:', error);
        throw error;
      }
    }
  }
  throw new Error(`Falha ao adicionar o script após ${retries} tentativas.`);
}

module.exports = { addScriptWithRetry };
