// src/4/4_chatsDeAtendimento.mjs

const chatsDeAtendimento = async (message, client) => {
  const userId = message.from;

  // Verifica se a mensagem é para finalizar o atendimento
  if (message.body.toLowerCase() === 'x') {
    const { endService } = await loadModule();
    await endService(message, client);
    return;
  }

  // Verifica se a mensagem é para voltar ao menu principal
  if (message.body.toLowerCase() === 'm') {
    const { sendMainMenu } = await loadModule();
    await sendMainMenu(message, client);
    return;
  }

  // Verifica se o contexto atual é 'chatsDeAtendimento'
  if (!globalThis.context[userId] || globalThis.context[userId] === 'chatsDeAtendimento') {
    const menuText = `Você escolheu Chats de Atendimento. Aqui estão as opções disponíveis:\n\n` +
                     `ⓐ Informações sobre o serviço\n` +
                     `ⓑ Exemplos de chats de atendimento\n` +
                     `ⓒ Contratar\n\n` +
                     `ⓜ Voltar ao Menu Principal\n` +
                     `ⓧ Finalizar Atendimento\n\n` +
                     `Digite a opção desejada.`;

    await client.sendText(userId, menuText);
    globalThis.context[userId] = 'chatsDeAtendimento'; // Define o contexto atual para Chats de Atendimento
    return;
  }

  // Processa a opção escolhida pelo usuário
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

export { chatsDeAtendimento };
