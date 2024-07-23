const puppeteer = require('puppeteer-core');
const { logger } = require('./utils/logger');

// Função para iniciar o navegador e página
const startBrowser = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    return { browser, page };
  } catch (error) {
    logger.error('Erro ao iniciar o navegador:', error);
    throw error;
  }
};

// Função para adicionar uma tag de script
const addScriptTag = async (page, url) => {
  try {
    await page.addScriptTag({ url });
  } catch (error) {
    logger.error('Erro ao adicionar a tag do script:', error);
    throw error;
  }
};

// Função para executar um código na página
const evaluatePage = async (page, fn) => {
  try {
    const result = await page.evaluate(fn);
    return result;
  } catch (error) {
    logger.error('Erro ao avaliar o código na página:', error);
    throw error;
  }
};

module.exports = { startBrowser, addScriptTag, evaluatePage };
