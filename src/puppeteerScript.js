const puppeteer = require('puppeteer');
const { logger } = require('./src/utils/logger');

/**
 * Adiciona uma tag de script à página.
 * @param {puppeteer.Page} page - A página do Puppeteer onde a tag será adicionada.
 * @param {string} url - A URL do script a ser adicionado.
 */
const addScriptTag = async (page, url) => {
  try {
    // Aguardar o carregamento da página e a estabilidade
    await page.waitForSelector('body', { timeout: 30000 });

    // Adicionar a tag do script
    await page.evaluate((scriptUrl) => {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
    }, url);

    logger.info(`Tag de script adicionada: ${url}`);
  } catch (error) {
    logger.error('Erro ao adicionar a tag do script:', error);
    throw error; // Re-lançar o erro para tratamento adicional se necessário
  }
};

/**
 * Inicia o navegador e a página, e adiciona a tag do script.
 * @param {string} scriptUrl - A URL do script a ser adicionado.
 */
const startBrowserAndAddScript = async (scriptUrl) => {
  let browser;
  try {
    // Iniciar o navegador com a opção --no-sandbox
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Navegar para uma página específica ou criar uma página em branco
    await page.goto('https://example.com'); // Substitua pela URL real se necessário
    await page.waitForNavigation({ waitUntil: 'networkidle0' }); // Aguardar navegação e carregamento completo

    // Adicionar a tag do script após a página estar completamente carregada
    await addScriptTag(page, scriptUrl);
  } catch (error) {
    logger.error('Erro ao iniciar o navegador ou adicionar o script:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

// Exemplo de uso - Substitua pela URL real do script quando você souber
startBrowserAndAddScript('https://example.com/script.js');
