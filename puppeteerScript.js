const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

async function startBrowserAndAddScript() {
  try {
    console.log('Navegando para a página...');
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto('https://web.whatsapp.com', { waitUntil: 'networkidle2' });

    // Aguardar o carregamento completo da página
    await page.waitForTimeout(3000); // aguarda 3 segundos

    console.log('Adicionando o script...');
    const result = await page.addScriptTag({ path: 'localScript.js' });

    console.log('Script adicionado com sucesso!');
    await browser.close();
  } catch (error) {
    console.error('Erro ao iniciar o navegador ou adicionar o script:', error);
  }
}

startBrowserAndAddScript();
