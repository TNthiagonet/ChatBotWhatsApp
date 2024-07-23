const puppeteer = require('puppeteer');
const fs = require('fs');
const { logger } = require('./src/utils/logger'); // Certifique-se de que o caminho está correto

/**
 * Adiciona uma tag de script à página.
 * @param {puppeteer.Page} page - A página do Puppeteer onde a tag será adicionada.
 * @param {string} url - A URL do script a ser adicionado.
 */
const addScriptTag = async (page, url) => {
  try {
    // Certifique-se de que a página está carregada
    await page.waitForSelector('body', { timeout: 30000 }); // Ajuste o seletor conforme necessário

    // Adicione a tag do script
    await page.addScriptTag({ url });
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
    // Inicie o navegador
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Ouça o evento 'load' para garantir que a página esteja carregada
    page.on('load', async () => {
      await addScriptTag(page, scriptUrl);
    });

    // Navegue para uma página de exemplo (substitua pela sua URL)
    await page.goto('https://example.com', { waitUntil: 'networkidle2' });

  } catch (error) {
    logger.error('Erro ao iniciar o navegador ou adicionar o script:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

// Exemplo de uso
startBrowserAndAddScript('https://example.com/script.js');
