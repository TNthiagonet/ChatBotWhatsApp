const { sendMainMenu, endService } = require('../../index');
const { landOptionA } = require('./A/1_A_landpages');
const { landOptionB } = require('./B/1_B_landpages');
const { landOptionC } = require('./C/1_C_landpages');

const landpages = async (message, client) => {
  const userId = message.from;

  if (message.body.toLowerCase() === 'x') {
    await endService(message, client);
    return;
  }

  if (message.body.toLowerCase() === 'm') {
    await sendMainMenu(message, client);
    return;
  }

  if (!global.context[userId] || global.context[userId] === 'landpages') {
    const menuText = `Você escolheu Land Pages. Aqui estão as opções disponíveis:\n\n` +
                     `ⓐ Informações sobre o serviço\n` +
                     `ⓑ Exemplos de páginas de land page\n` +
                     `ⓒ Contratar\n\n` +
                     `ⓜ Voltar ao Menu Principal\n` +
                     `ⓧ Finalizar Atendimento\n\n` +
                     `Digite a opção desejada.`;

    await client.sendText(userId, menuText);
    global.context[userId] = 'landpages'; // Define o contexto atual para Land Pages
    return;
  }

  // Redireciona para o arquivo correspondente com base na escolha do submenu
  switch (message.body.toUpperCase()) {
    case 'A':
      await landOptionA(message, client);
      break;
    case 'B':
      await landOptionB(message, client);
      break;
    case 'C':
      await landOptionC(message, client);
      break;
    default:
      await client.sendText(userId, 'Opção inválida. Por favor, escolha uma opção válida.');
  }
};

module.exports = { landpages };
