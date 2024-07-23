const wppconnect = require('@wppconnect-team/wppconnect');
const fs = require('fs');
const { logger } = require('./src/utils/logger');

// Importar módulos dos menus principais
const { handleLandpages } = require('./1_landpages');
const { handleInstitucionais } = require('./2_institucionais');
const { handleCardapioOnline } = require('./3_cardapioOnline');
const { handleChatsDeAtendimento } = require('./4_chatsDeAtendimento');

// Importar módulos dos submenus
const landpagesA = require('./1_A_landpages');
const landpagesB = require('./1_B_landpages');
const landpagesC = require('./1_C_landpages');
const institucionaisA = require('./2_A_institucionais');
const institucionaisB = require('./2_B_institucionais');
const institucionaisC = require('./2_C_institucionais');
const cardapioOnlineA = require('./3_A_cardapioOnline');
const cardapioOnlineB = require('./3_B_cardapioOnline');
const cardapioOnlineC = require('./3_C_cardapioOnline');
const chatsDeAtendimentoA = require('./4_A_chatsDeAtendimento');
const chatsDeAtendimentoB = require('./4_B_chatsDeAtendimento');
const chatsDeAtendimentoC = require('./4_C_chatsDeAtendimento');

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
    if (context === 'main') {
      if (message.body === '1') {
        global.context[message.from] = 'landpages';
        await handleLandpages(message, client);
      } else if (message.body === '2') {
        global.context[message.from] = 'institucionais';
        await handleInstitucionais(message, client);
      } else if (message.body === '3') {
        global.context[message.from] = 'cardapioOnline';
        await handleCardapioOnline(message, client);
      } else if (message.body === '4') {
        global.context[message.from] = 'chatsDeAtendimento';
        await handleChatsDeAtendimento(message, client);
      } else {
        await sendMainMenu(message, client);
      }
    } else if (context === 'landpages') {
      switch (message.body.toLowerCase()) {
        case 'a':
          await landpagesA.handleLandpagesA(message, client);
          break;
        case 'b':
          await landpagesB.handleLandpagesB(message, client);
          break;
        case 'c':
          await landpagesC.handleLandpagesC(message, client);
          break;
        default:
          await handleLandpages(message, client);
      }
    } else if (context === 'institucionais') {
      switch (message.body.toLowerCase()) {
        case 'a':
          await institucionaisA.handleInstitucionaisA(message, client);
          break;
        case 'b':
          await institucionaisB.handleInstitucionaisB(message, client);
          break;
        case 'c':
          await institucionaisC.handleInstitucionaisC(message, client);
          break;
        default:
          await handleInstitucionais(message, client);
      }
    } else if (context === 'cardapioOnline') {
      switch (message.body.toLowerCase()) {
        case 'a':
          await cardapioOnlineA.handleCardapioOnlineA(message, client);
          break;
        case 'b':
          await cardapioOnlineB.handleCardapioOnlineB(message, client);
          break;
        case 'c':
          await cardapioOnlineC.handleCardapioOnlineC(message, client);
          break;
        default:
          await handleCardapioOnline(message, client);
      }
    } else if (context === 'chatsDeAtendimento') {
      switch (message.body.toLowerCase()) {
        case 'a':
          await chatsDeAtendimentoA.handleChatsDeAtendimentoA(message, client);
          break;
        case 'b':
          await chatsDeAtendimentoB.handleChatsDeAtendimentoB(message, client);
          break;
        case 'c':
          await chatsDeAtendimentoC.handleChatsDeAtendimentoC(message, client);
          break;
        default:
          await handleChatsDeAtendimento(message, client);
      }
    } else {
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
    if (message.body === '0') {
      await sendMainMenu(message, client);
      return;
    } else if (message.body.toLowerCase() === 'x') {
      await endService(message, client);
      return;
    }

    await handleMenu(message, client);
  });
}).catch((error) => logger.error('Erro ao criar o cliente WPPConnect:', error));
