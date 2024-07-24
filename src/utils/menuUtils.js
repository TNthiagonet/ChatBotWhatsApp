const { logger } = require('./logger');

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

const endService = async (message, client) => {
  try {
    await client.sendText(message.from, 'Atendimento Finalizado.');
    delete global.context[message.from]; // Remove o contexto do usuário
  } catch (error) {
    logger.error('Erro ao finalizar o atendimento:', error);
  }
};

module.exports = { sendMainMenu, endService };
