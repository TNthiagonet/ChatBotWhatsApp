const fs = require('fs').promises;

async function addScriptWithRetry(page, scriptPath, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await fs.access(scriptPath); // Verifica se o arquivo existe
      await page.addScriptTag({ path: scriptPath }); // Adiciona o script à página
      return;
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`O arquivo ${scriptPath} não existe.`);
      } else {
        console.error(`Erro ao adicionar o script, tentando novamente... ${error.message}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo antes de tentar novamente
      }
    }
  }
  throw new Error(`Falha ao adicionar o script após ${retries} tentativas.`);
}

module.exports = { addScriptWithRetry };
