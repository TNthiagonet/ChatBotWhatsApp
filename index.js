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
const sendMainMenu = (message, client) => {
  const menuText = `Bem vindo(a) à ThiagoNET, Agência de Desenvolvimento.\n\n` +
                   `Me diga qual destas opções abaixo melhor lhe atende.\n\n` +
                   `1️⃣ Land Pages\n` +
                   `2️⃣ Institucionais\n` +
                   `3️⃣ Cardápio Online\n` +
                   `4️⃣ Chats Inteligentes\n\n` +
                   `Digite a opção desejada.`;

  client.sendText(message.from, menuText);
  global.context[message.from] = 'main'; // Define o contexto atual como Menu Principal
};

// Função para finalizar o atendimento
const endService = (message, client) => {
  client.sendText(message.from, 'Atendimento Finalizado.');
  delete global.context[message.from]; // Remove o contexto do usuário
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
const handleMenu = (message, client) => {
  const context = global.context[message.from];

  switch (context) {
    case 'landpages':
      landpages.handleLandpages(message, client);
      break;
    case 'institucionais':
      institucionais.handleInstitucionais(message, client);
      break;
    case 'cardapioOnline':
      cardapioOnline.handleCardapioOnline(message, client);
      break;
    case 'chatsDeAtendimento':
      chatsDeAtendimento.handleChatsDeAtendimento(message, client);
      break;
    case 'main':
      sendMainMenu(message, client);
      break;
    default:
      sendMainMenu(message, client);
  }
};

wppconnect.create().then(async (client) => {
  await delay(5000); // Aguardar 5 segundos antes de prosseguir

  client.onMessage((message) => {
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
      sendMainMenu(message, client);
      return;
    } else if (message.body.toLowerCase() === 'x') {
      endService(message, client);
      return;
    }

    handleMenu(message, client);
  });
}).catch((error) => logger.error(error));
