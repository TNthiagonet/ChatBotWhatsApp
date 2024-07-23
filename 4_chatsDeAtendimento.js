const { sendMainMenu, endService } = require('./index');

// Função para lidar com o menu Chats de Atendimento
const handleChatsDeAtendimento = async (message, client) => {
  const userId = message.from;

  if (message.body === '0') {
    await sendMainMenu(message, client);
    return;
  }

  if (message.body.toLowerCase() === 'x') { // Inclui tanto 'x' quanto 'X'
    await endService(message, client);
    return;
  }

  if (!global.context[userId] || global.context[userId] === 'chatsDeAtendimento') {
    const menuText = `Você escolheu Chats de Atendimento. Aqui estão as opções disponíveis:\n\n` +
                     `A️⃣ Informações sobre o serviço\n` +
                     `B️⃣ Exemplos de chats de atendimento\n` +
                     `C️⃣ Contratar\n\n` +
                     `0️⃣ Voltar ao Menu Principal\n` +
                     `✖️ Finalizar Atendimento\n\n` +
                     `Digite a opção desejada.`;

    await client.sendText(userId, menuText);
    global.context[userId] = 'chatsDeAtendimento'; // Define o contexto atual para Chats de Atendimento
    return;
  }

  switch (message.body.toUpperCase()) {
    case 'A':
      const responseTextA = `Aqui estão as informações sobre nossos chats de atendimento:\n\n` +
                            `- Implementação de chats automáticos para atendimento ao cliente.\n` +
                            `- Respostas automatizadas e integração com CRM.\n` +
                            `- Análise de dados e relatórios de atendimento.\n\n` +
                            `Para mais detalhes, entre em contato com nossa equipe.`;
      await client.sendText(userId, responseTextA);
      break;
    case 'B':
      const responseTextB = `Aqui estão alguns exemplos de chats de atendimento que criamos:\n\n` +
                            `🌟 Exemplo 1: [https://exemplo1.com]\n` +
                            `🚀 Exemplo 2: [https://exemplo2.com]\n\n` +
                            `Se desejar mais exemplos, por favor, nos avise.`;
      await client.sendText(userId, responseTextB);
      break;
    case 'C':
      const responseTextC = `Para contratar nossos serviços de chat de atendimento, por favor, entre em contato com nossa equipe comercial:\n\n` +
                            `📞 Telefone: [83 98179-0771]\n` +
                            `📧 E-mail: [contato@thiagonet.com]\n\n` +
                            `Estamos prontos para ajudá-lo a implementar um chat de atendimento eficiente para sua empresa.`;
      await client.sendText(userId, responseTextC);
      break;
    default:
      await client.sendText(userId, 'Opção inválida. Por favor, escolha uma opção válida.');
  }
};

module.exports = { handleChatsDeAtendimento };
