const puppeteer = require('puppeteer');

async function startBrowserAndAddScript() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Navegando para a página...');
  await page.goto('https://example.com'); // Substitua pela URL da sua página

  // Espera até que um seletor específico esteja presente na página
  await page.waitForSelector('body'); // Ajuste o seletor conforme necessário

  try {
    console.log('Tentando adicionar o script...');
    await page.addScriptTag({ path: 'localScript.js' }); // Ajuste o caminho do seu script local
    console.log('Script adicionado com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar o script:', error);
  }

  await browser.close();
}

startBrowserAndAddScript();
