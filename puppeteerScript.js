const puppeteer = require('puppeteer');
const chromium = require('chrome-aws-lambda');

const addScriptWithRetry = async (page, path) => {
  let retries = 3;
  while (retries > 0) {
    try {
      await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 });
      await page.addScriptTag({ path });
      console.log('Script adicionado com sucesso!');
      return;
    } catch (error) {
      console.error('Erro ao adicionar o script, tentando novamente...', error);
      retries -= 1;
      await delay(1000);
    }
  }
  console.error('Falha ao adicionar o script após várias tentativas.');
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const startBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Utilize a função addScriptWithRetry quando necessário
  await addScriptWithRetry(page, '/path/to/your/script.js');
  
  // Outras operações com o Puppeteer
};

startBrowser();
