const { exec } = require('child_process');

exec('npm list puppeteer --depth=0', (error, stdout, stderr) => {
    if (error) {
        console.error(`Erro: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log('Saída:', stdout);
});
