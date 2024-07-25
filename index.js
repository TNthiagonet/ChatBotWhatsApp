import wppconnect from '@wppconnect-team/wppconnect';
import fs from 'fs';
import { logger } from './src/utils/logger.mjs';

import { landpages } from './src/1/1_landpages.mjs';
import { institucionais } from './src/2/2_institucionais.mjs';
import { cardapioOnline } from './src/3/3_cardapioOnline.mjs';
import { chatsDeAtendimento } from './src/4/4_chatsDeAtendimento.mjs';

import * as landpagesA from './src/1/A/1_A_landpages.mjs';
import * as landpagesB from './src/1/B/1_B_landpages.mjs';
import * as landpagesC from './src/1/C/1_C_landpages.mjs';
import * as institucionaisA from './src/2/A/2_A_institucionais.mjs';
import * as institucionaisB from './src/2/B/2_B_institucionais.mjs';
import * as institucionaisC from './src/2/C/2_C_institucionais.mjs';
import * as cardapioOnlineA from './src/3/A/3_A_cardapioOnline.mjs';
import * as cardapioOnlineB from './src/3/B/3_B_cardapioOnline.mjs';
import * as cardapioOnlineC from './src/3/C/3_C_cardapioOnline.mjs';
import * as chatsDeAtendimentoA from './src/4/A/4_A_chatsDeAtendimento.mjs';
import * as chatsDeAtendimentoB from './src/4/B/4_B_chatsDeAtendimento.mjs';
import * as chatsDeAtendimentoC from './src/4/C/4_C_chatsDeAtendimento.mjs';

// Configura o contexto global
globalThis.context = {};

// Envia o menu principal ao usuário
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
    globalThis.context[message.from] = 'main';
  } catch (error) {
    logger.error('Erro ao enviar menu principal:', error);
  }
};

// Finaliza o atendimento
const endService = async (message, client) => {
  try {
    await client.sendText(message.from, 'Atendimento Finalizado.');
    delete globalThis.context[message.from];
  } catch (error) {
    logger.error('Erro ao finalizar o atendimento:', error);
  }
};

// Registra as mensagens em um arquivo de log
const logMessageToFile = (message) => {
  const logEntry = `${new Date().toISOString()} - ${message.from}: ${message.body}\n`;
  fs.appendFile('chat_logs.txt', logEntry, (err) => {
    if (err) {
      logger.error('Erro ao escrever no arquivo de log:', err);
    }
  });
};

// Adiciona um delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Manipula o menu com base na mensagem recebida
const handleMenu = async (message, client) => {
  const context = globalThis.context[message.from];

  try {
    switch (context) {
      case 'main':
        switch (message.body) {
          case '1':
            globalThis.context[message.from] = 'landpages';
            await landpages(message, client);
            break;
          case '2':
            globalThis.context[message.from] = 'institucionais';
            await institucionais(message, client);
            break;
          case '3':
            globalThis.context[message.from] = 'cardapioOnline';
            await cardapioOnline(message, client);
            break;
          case '4':
            globalThis.context[message.from] = 'chatsDeAtendimento';
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
        break;

      case 'landpages':
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
        break;

      case 'institucionais':
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
        break;

      case 'cardapioOnline':
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
        break;

      case 'chatsDeAtendimento':
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
        break;

      default:
        await sendMainMenu(message, client);
    }
  } catch (error) {
    logger.error('Erro ao manipular o menu:', error);
  }
};

// Inicializa o cliente WPPConnect e configura os eventos
wppconnect.create({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
}).then(async (client) => {
  await delay(5000);

  client.onMessage(async (message) => {
    logMessageToFile(message);

    if (message.body === '0') {
      await sendMainMenu(message, client);
    } else if (message.body.toLowerCase() === 'x') {
      await endService(message, client);
    } else {
      await handleMenu(message, client);
    }
  });
}).catch((error) => logger.error('Erro ao criar o cliente WPPConnect:', error));
