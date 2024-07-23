const { sendMainMenu, endService } = require('./index');
const { handleOptionA } = require('./1_A_landpages');
const { handleOptionB } = require('./1_B_landpages');
const { handleOptionC } = require('./1_C_landpages');

const handleLandpages = async (message, client) => {
  const userId = message.from;

  if (message.body === '0') {
    await sendMainMenu(message, client);
    return;
  }

  if (message.body.toLowerCase() === 'x') {
    await endService(message, client);
    return;
  }

  if (!global.context[userId] || global.context[userId] === 'landpages') {
    const menuText = `Você escolheu Land Pages. Aqui estão as opções disponíveis:\n\n` +
                     `A️ Informações sobre o serviço\n` +
                     `B️ Exemplos de páginas de land page\n` +
                     `C️ Contratar\n\n` +
                     `0️⃣ Voltar ao Menu Principal\n` +
                     `✖️ Finalizar Atendimento\n\n` +
                     `Digite a opção desejada.`;

    await client.sendText(userId, menuText);
    global.context[userId] = 'landpages'; // Define o contexto atual para Land Pages
    return;
  }

  // Redireciona para o arquivo correspondente com base na escolha do submenu
  switch (message.body.toUpperCase()) {
    case 'A':
      await handleOptionA(message, client);
      break;
    case 'B':
      await handleOptionB(message, client);
      break;
    case 'C':
      await handleOptionC(message, client);
      break;
    default:
      await client.sendText(userId, 'Opção inválida. Por favor, escolha uma opção válida.');
  }
};

module.exports = { handleLandpages };
