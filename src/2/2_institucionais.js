const { sendMainMenu, endService } = require('../../index');
const { instOptionA } = require('./A/2_A_institucionais');
const { instOptionB } = require('./B/2_B_institucionais');
const { instOptionC } = require('./C/2_C_institucionais');

const institucionais = async (message, client) => {
  const userId = message.from;

  if (message.body.toLowerCase() === 'x') {
    await endService(message, client);
    return;
  }

  if (message.body.toLowerCase() === 'm') {
    await sendMainMenu(message, client);
    return;
  }

  if (!global.context[userId] || global.context[userId] === 'institucionais') {
    const menuText = `Você escolheu Institucionais. Aqui estão as opções disponíveis:\n\n` +
                     `ⓐ Informações sobre o serviço\n` +
                     `ⓑ Exemplos de páginas institucionais\n` +
                     `ⓒ Contratar\n\n` +
                     `ⓜ Voltar ao Menu Principal\n` +
                     `ⓧ Finalizar Atendimento\n\n` +
                     `Digite a opção desejada.`;

    await client.sendText(userId, menuText);
    global.context[userId] = 'institucionais'; // Define o contexto atual para Institucionais
    return;
  }

  // Redireciona para o arquivo correspondente com base na escolha do submenu
  switch (message.body.toUpperCase()) {
    case 'A':
      await instOptionA(message, client);
      break;
    case 'B':
      await instOptionB(message, client);
      break;
    case 'C':
      await instOptionC(message, client);
      break;
    default:
      await client.sendText(userId, 'Opção inválida. Por favor, escolha uma opção válida.');
  }
};

module.exports = { institucionais };
