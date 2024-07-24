const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/path/to/chrome', // Substitua pelo caminho correto do Chrome
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // O resto do seu código aqui

  await browser.close();
})();
