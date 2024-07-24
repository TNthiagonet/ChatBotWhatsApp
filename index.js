// index.js
import wppconnect from '@wppconnect-team/wppconnect';
import fs from 'fs';
import puppeteer from 'puppeteer';
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

globalThis.context = {};

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

const endService = async (message, client) => {
  try {
    await client.sendText(message.from, 'Atendimento Finalizado.');
    delete globalThis.context[message.from];
  } catch (error) {
    logger.error('Erro ao finalizar o atendimento:', error);
  }
};

const logMessageToFile = (message) => {
  const logEntry = `${new Date().toISOString()} - ${message.from}: ${message.body}\n`;
  fs.appendFile('chat_logs.txt', logEntry, (err) => {
    if (err) {
      logger.error('Erro ao escrever no arquivo de log:', err);
    }
  });
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const addScriptWithRetry = async (page, path) => {
  let retries = 3;
  while (retries > 0) {
    try {
      await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 });
      await page.addScriptTag({ path });
      console.log('Script adicionado com sucesso!');
      return;
    } catch (error) {
      console.error('Erro ao adicionar o script, tentando novamente...', error);
      retries -= 1;
      await page.waitForTimeout(1000);
    }
  }
  console.error('Falha ao adicionar o script após várias tentativas.');
};

const startBrowser = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://example.com');
    console.log('Página carregada com sucesso!');
    await addScriptWithRetry(page, '/path/to/your/script.js');
  } catch (error) {
    console.error('Erro ao iniciar o navegador:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const handleMenu = async (message, client) => {
  const context = globalThis.context[message.from];

  try {
    if (context === 'main') {
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
