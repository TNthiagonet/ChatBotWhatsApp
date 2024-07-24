const { sendMainMenu, endService } = require('../../index');
const { cardOptionA } = require('./A/3_A_cardapioOnline');
const { cardOptionB } = require('./B/3_B_cardapioOnline');
const { cardOptionC } = require('./C/3_C_cardapioOnline');

const cardapioOnline = async (message, client) => {
  const userId = message.from;

  if (message.body.toLowerCase() === 'x') {
    await endService(message, client);
    return;
  }

  if (message.body.toLowerCase() === 'm') {
    await sendMainMenu(message, client);
    return;
  }

  if (!global.context[userId] || global.context[userId] === 'cardapioOnline') {
    const menuText = `Você escolheu Cardápio Online. Aqui estão as opções disponíveis:\n\n` +
                     `ⓐ Informações sobre o serviço\n` +
                     `ⓑ Exemplos de cardápios online\n` +
                     `ⓒ Contratar\n\n` +
                     `ⓜ Voltar ao Menu Principal\n` +
                     `ⓧ Finalizar Atendimento\n\n` +
                     `Digite a opção desejada.`;

    await client.sendText(userId, menuText);
    global.context[userId] = 'cardapioOnline'; // Define o contexto atual para Cardápio Online
    return;
  }

  // Redireciona para o arquivo correspondente com base na escolha do submenu
  switch (message.body.toUpperCase()) {
    case 'A':
      await cardOptionA(message, client);
      break;
    case 'B':
      await cardOptionB(message, client);
      break;
    case 'C':
      await cardOptionC(message, client);
      break;
    default:
      await client.sendText(userId, 'Opção inválida. Por favor, escolha uma opção válida.');
  }
};

module.exports = { cardapioOnline };
