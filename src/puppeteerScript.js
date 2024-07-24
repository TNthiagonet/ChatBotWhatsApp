const puppeteer = require('puppeteer');
const { logger } = require('./src/utils/logger');

/**
 * Adiciona uma tag de script à página.
 * @param {puppeteer.Page} page - A página do Puppeteer onde a tag será adicionada.
 * @param {string} url - A URL do script a ser adicionado.
 */
const addScriptTag = async (page, url) => {
  try {
    await page.waitForSelector('body', { timeout: 30000 });

    await page.evaluate((scriptUrl) => {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
    }, url);

    logger.info(`Tag de script adicionada: ${url}`);
  } catch (error) {
    logger.error('Erro ao adicionar a tag do script:', error);
    throw error;
  }
};

/**
 * Inicia o navegador e a página, e adiciona a tag do script.
 * @param {string} scriptUrl - A URL do script a ser adicionado.
 */
const startBrowserAndAddScript = async (scriptUrl) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    await addScriptTag(page, scriptUrl);
  } catch (error) {
    logger.error('Erro ao iniciar o navegador ou adicionar o script:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

startBrowserAndAddScript('https://example.com/script.js');
