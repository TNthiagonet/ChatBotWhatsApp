const { sendMainMenu, endService } = require('./index');
const { chatOptionA } = require('./4_A_chatsDeAtendimento');
const { chatOptionB } = require('./4_B_chatsDeAtendimento');
const { chatOptionC } = require('./4_C_chatsDeAtendimento');

const chatsDeAtendimento = async (message, client) => {
  const userId = message.from;

  if (message.body.toLowerCase() === 'x') {
    await endService(message, client);
    return;
  }

  if (message.body.toLowerCase() === 'm') {
    await sendMainMenu(message, client);
    return;
  }

  if (!global.context[userId] || global.context[userId] === 'chatsDeAtendimento') {
    const menuText = `Você escolheu Chats de Atendimento. Aqui estão as opções disponíveis:\n\n` +
                     `ⓐ Informações sobre o serviço\n` +
                     `ⓑ Exemplos de chats de atendimento\n` +
                     `ⓒ Contratar\n\n` +
                     `ⓜ Voltar ao Menu Principal\n` +
                     `ⓧ Finalizar Atendimento\n\n` +
                     `Digite a opção desejada.`;

    await client.sendText(userId, menuText);
    global.context[userId] = 'chatsDeAtendimento'; // Define o contexto atual para Chats de Atendimento
    return;
  }

  // Redireciona para o arquivo correspondente com base na escolha do submenu
  switch (message.body.toUpperCase()) {
    case 'A':
      await chatOptionA(message, client);
      break;
    case 'B':
      await chatOptionB(message, client);
      break;
    case 'C':
      await chatOptionC(message, client);
      break;
    default:
      await client.sendText(userId, 'Opção inválida. Por favor, escolha uma opção válida.');
  }
};

module.exports = { chatsDeAtendimento };
