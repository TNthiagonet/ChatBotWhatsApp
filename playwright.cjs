// playwright.js
const { chromium } = require('playwright');

(async () => {
  // Lança uma nova instância do navegador Chromium
  const browser = await chromium.launch({ headless: true });
  
  // Cria uma nova página no navegador
  const page = await browser.newPage();
  
  // Navega até a URL especificada
  await page.goto('https://example.com');
  
  // Adicione seu código para interagir com a página aqui
  // Por exemplo, você pode tirar uma captura de tela da página
  await page.screenshot({ path: 'screenshot.png' });
  
  // Obtém o título da página e imprime no console
  const title = await page.title();
  console.log(`Título da página: ${title}`);
  
  // Fecha o navegador
  await browser.close();
})();
