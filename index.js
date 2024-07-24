const wppconnect = require('@wppconnect-team/wppconnect');
const fs = require('fs');
const { logger } = require('./src/utils/logger');

// Importar módulos dos menus principais
const { landpages } = require('./src/1/1_landpages');
const { institucionais } = require('./src/2/2_institucionais');
const { cardapioOnline } = require('./src/3/3_cardapioOnline');
const { chatsDeAtendimento } = require('./src/4/4_chatsDeAtendimento');

// Importar módulos dos submenus
const landpagesA = require('./src/1/A/1_A_landpages');
const landpagesB = require('./src/1/B/1_B_landpages');
const landpagesC = require('./src/1/C/1_C_landpages');
const institucionaisA = require('./src/2/A/2_A_institucionais');
const institucionaisB = require('./src/2/B/2_B_institucionais');
const institucionaisC = require('./src/2/C/2_C_institucionais');
const cardapioOnlineA = require('./src/3/A/3_A_cardapioOnline');
const cardapioOnlineB = require('./src/3/B/3_B_cardapioOnline');
const cardapioOnlineC = require('./src/3/C/3_C_cardapioOnline');
const chatsDeAtendimentoA = require('./src/4/A/4_A_chatsDeAtendimento');
const chatsDeAtendimentoB = require('./src/4/B/4_B_chatsDeAtendimento');
const chatsDeAtendimentoC = require('./src/4/C/4_C_chatsDeAtendimento');

// Contexto para armazenar o estado do menu do usuário
global.context = {}; // Definido como global para que possa ser acessado em outros arquivos

// Função para enviar o menu principal
const sendMainMenu = async (message, client) => {
  const menuText = `👤 Bem vindo(a) à ThiagoNET, Agência de Desenvolvimento.\n\n` +
                   `Me diga qual destas opções abaixo melhor lhe atende.\n\n` +
                   `❶ Land Pages\n` +
                   `❷ Institucionais\n` +
                   `❸ Cardápio Online\n` +
                   `❹ Chats Inteligentes\n\n` +
                   `Digite a opção desejada.`;

  try {
    await client.sendText(message.from, menuText);
    global.context[message.from] = 'main'; // Define o contexto atual como Menu Principal
  } catch (error) {
    logger.error('Erro ao enviar menu principal:', error);
  }
};

// Função para finalizar o atendimento
const endService = async (message, client) => {
  try {
    await client.sendText(message.from, 'Atendimento Finalizado.');
    delete global.context[message.from]; // Remove o contexto do usuário
  } catch (error) {
    logger.error('Erro ao finalizar o atendimento:', error);
  }
};

// Função para logar mensagens no arquivo
const logMessageToFile = (message) => {
  const logEntry = `${new Date().toISOString()} - ${message.from}: ${message.body}\n`;
  fs.appendFile('chat_logs.txt', logEntry, (err) => {
    if (err) {
      logger.error('Erro ao escrever no arquivo de log:', err);
    }
  });
};

// Função de delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Função para adicionar script com tentativas
const addScriptWithRetry = async (page, path) => {
  let retries = 3; // Número de tentativas
  while (retries > 0) {
    try {
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

// Função para manipular menus baseados no contexto do usuário
const handleMenu = async (message, client) => {
  const context = global.context[message.from];

  try {
    if (context === 'main') {
      switch (message.body) {
        case '1':
          global.context[message.from] = 'landpages';
          await landpages(message, client);
          break;
        case '2':
          global.context[message.from] = 'institucionais';
          await institucionais(message, client);
          break;
        case '3':
          global.context[message.from] = 'cardapioOnline';
          await cardapioOnline(message, client);
          break;
        case '4':
          global.context[message.from] = 'chatsDeAtendimento';
          await chatsDeAtendimento(message, client);
          break;
        case '0':
          await sendMainMenu(message, client);
          break;
        case 'x':
          await endService(message, client);
          break;
        default:
          await sendMainMenu(message, client);
      }
    } else if (context === 'landpages') {
      switch (message.body.toLowerCase()) {
        case 'a':
          await landpagesA.landOptionA(message, client);
          break;
        case 'b':
          await landpagesB.landOptionB(message, client);
          break;
        case 'c':
          await landpagesC.landOptionC(message, client);
          break;
        case 'm':
          await sendMainMenu(message, client);
          break;
        case 'x':
          await endService(message, client);
          break;
        default:
          await landpages(message, client);
      }
    } else if (context === 'institucionais') {
      switch (message.body.toLowerCase()) {
        case 'a':
          await institucionaisA.instOptionA(message, client);
          break;
        case 'b':
          await institucionaisB.instOptionB(message, client);
          break;
        case 'c':
          await institucionaisC.instOptionC(message, client);
          break;
        case 'm':
          await sendMainMenu(message, client);
          break;
        case 'x':
          await endService(message, client);
          break;
        default:
          await institucionais(message, client);
      }
    } else if (context === 'cardapioOnline') {
      switch (message.body.toLowerCase()) {
        case 'a':
          await cardapioOnlineA.cardOptionA(message, client);
          break;
        case 'b':
          await cardapioOnlineB.cardOptionB(message, client);
          break;
        case 'c':
          await cardapioOnlineC.cardOptionC(message, client);
          break;
        case 'm':
          await sendMainMenu(message, client);
          break;
        case 'x':
          await endService(message, client);
          break;
        default:
          await cardapioOnline(message, client);
      }
    } else if (context === 'chatsDeAtendimento') {
      switch (message.body.toLowerCase()) {
        case 'a':
          await chatsDeAtendimentoA.chatOptionA(message, client);
          break;
        case 'b':
          await chatsDeAtendimentoB.chatOptionB(message, client);
          break;
        case 'c':
          await chatsDeAtendimentoC.chatOptionC(message, client);
          break;
        case 'm':
          await sendMainMenu(message, client);
          break;
        case 'x':
          await endService(message, client);
          break;
        default:
          await chatsDeAtendimento(message, client);
      }
    } else {
      await sendMainMenu(message, client);
    }
  } catch (error) {
    logger.error('Erro ao manipular o menu:', error);
  }
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
