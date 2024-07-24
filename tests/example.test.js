const puppeteer = require('puppeteer');
const { addScriptWithRetry } = require('../src/scriptUtils.cjs');
const path = require('path');

test('Deve adicionar o script com sucesso', async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const validScriptPath = path.resolve(__dirname, '../scripts/validScript.js'); // Caminho absoluto para o script válido
    await addScriptWithRetry(page, validScriptPath);
  } catch (error) {
    expect(error).toBeUndefined(); // Verifique se o erro não deveria existir
  } finally {
    await browser.close();
  }
}, 15000); // Aumentar o timeout para 15 segundos

test('Deve lidar com erro ao adicionar script', async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const invalidScriptPath = path.resolve(__dirname, '../scripts/invalidScript.js'); // Caminho absoluto para o script inválido
    await expect(addScriptWithRetry(page, invalidScriptPath)).rejects.toThrow(/O arquivo .*invalidScript.js não existe./);
  } catch (error) {
    expect(error.message).toMatch(/O arquivo .*invalidScript.js não existe./);
  } finally {
    await browser.close();
  }
}, 15000); // Aumentar o timeout para 15 segundos
