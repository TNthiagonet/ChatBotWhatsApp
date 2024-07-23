const wppconnect = require('@wppconnect-team/wppconnect');
const fs = require('fs');
const { logger } = require('./src/utils/logger');

// Importar módulos dos menus
const landpages = require('./1_landpages');
const institucionais = require('./2_institucionais');
const cardapioOnline = require('./3_cardapioOnline');
const chatsDeAtendimento = require('./4_chatsDeAtendimento');

// Contexto para armazenar o estado do menu do usuário
global.context = {}; // Definido como global para que possa ser acessado em outros arquivos

// Função para enviar o menu principal
const sendMainMenu = async (message, client) => {
  const menuText = `Bem vindo(a) à ThiagoNET, Agência de Desenvolvimento.\n\n` +
                   `Me diga qual destas opções abaixo melhor lhe atende.\n\n` +
                   `1️⃣ Land Pages\n` +
                   `2️⃣ Institucionais\n` +
                   `3️⃣ Cardápio Online\n` +
                   `4️⃣ Chats Inteligentes\n\n` +
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

// Função para manipular menus baseados no contexto do usuário
const handleMenu = async (message, client) => {
  const context = global.context[message.from];

  try {
    switch (context) {
      case 'landpages':
        await landpages.handleLandpages(message, client);
        break;
      case 'institucionais':
        await institucionais.handleInstitucionais(message, client);
        break;
      case 'cardapioOnline':
        await cardapioOnline.handleCardapioOnline(message, client);
        break;
      case 'chatsDeAtendimento':
        await chatsDeAtendimento.handleChatsDeAtendimento(message, client);
        break;
      case 'main':
        await sendMainMenu(message, client);
        break;
      default:
        await sendMainMenu(message, client);
    }
  } catch (error) {
    logger.error('Erro ao manipular o menu:', error);
  }
};

wppconnect.create().then(async (client) => {
  await delay(5000); // Aguardar 5 segundos antes de prosseguir

  client.onMessage(async (message) => {
    // Logar a mensagem recebida
    logMessageToFile(message);

    // Atualizar o contexto baseado na opção escolhida
    if (message.body === '1') {
      global.context[message.from] = 'landpages';
    } else if (message.body === '2') {
      global.context[message.from] = 'institucionais';
    } else if (message.body === '3') {
      global.context[message.from] = 'cardapioOnline';
    } else if (message.body === '4') {
      global.context[message.from] = 'chatsDeAtendimento';
    } else if (message.body === '0') {
      await sendMainMenu(message, client);
      return;
    } else if (message.body.toLowerCase() === 'x') {
      await endService(message, client);
      return;
    }

    await handleMenu(message, client);
  });
}).catch((error) => logger.error(error));
