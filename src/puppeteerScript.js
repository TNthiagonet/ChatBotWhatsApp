const puppeteer = require('puppeteer');

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
        console.error('Erro ao iniciar o navegador ou adicionar o script:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

startBrowserAndAddScript('https://example.com/script.js');
