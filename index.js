const wppconnect = require('@wppconnect-team/wppconnect');
const { logger } = require('./src/utils/logger');
const landpages = require('./1_landpages');
const institucionais = require('./2_institucionais');
const cardapioOnline = require('./3_cardapioOnline');
const chatsDeAtendimento = require('./4_chatsDeAtendimento');

wppconnect.create().then((client) => {
  client.onMessage((message) => {
    if (message.body === '1') {
      landpages.handle(message, client);
    } else if (message.body === '2') {
      institucionais.handle(message, client);
    } else if (message.body === '3') {
      cardapioOnline.handle(message, client);
    } else if (message.body === '4') {
      chatsDeAtendimento.handle(message, client);
    } else {
      client.sendText(message.from, 'Menu Principal:\n1. LandPages\n2. Páginas Institucionais\n3. Cardápio Online\n4. Chats de Atendimento');
    }
  });
}).catch((error) => logger.error(error));
