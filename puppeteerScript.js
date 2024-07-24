const addScriptWithRetry = async (page, path) => {
    let retries = 3; // Número de tentativas
    while (retries > 0) {
      try {
        // Esperar até que a navegação (se houver) termine
        await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 });
  
        // Adicionar o script
        await page.addScriptTag({ path });
        console.log('Script adicionado com sucesso!');
        return; // Sai da função se bem-sucedido
      } catch (error) {
        console.error('Erro ao adicionar o script, tentando novamente...', error);
        retries -= 1; // Decrementa o número de tentativas restantes
        await page.waitForTimeout(1000); // Aguarda antes de tentar novamente
      }
    }
    console.error('Falha ao adicionar o script após várias tentativas.');
  };
  
  // Iniciar o cliente WPPConnect
  wppconnect.create({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }).then(async (client) => {
    await delay(5000); // Aguardar 5 segundos antes de prosseguir
  
    client.onMessage(async (message) => {
      // Logar a mensagem recebida
      logMessageToFile(message);
  
      // Atualizar o contexto baseado na opção escolhida
      if (message.body === '0') {
        await sendMainMenu(message, client);
      } else if (message.body.toLowerCase() === 'x') {
        await endService(message, client);
      } else {
        await handleMenu(message, client);
      }
    });
  }).catch((error) => logger.error('Erro ao criar o cliente WPPConnect:', error));
  