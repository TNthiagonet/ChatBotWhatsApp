const { sendMainMenu, endService } = require('./index');

const handleChatsDeAtendimento = (message, client) => {
  const userId = message.from;

  if (message.body === '0') {
    sendMainMenu(message, client);
    return;
  }

  if (message.body.toLowerCase() === 'x') { // Inclui tanto 'x' quanto 'X'
    endService(message, client);
    return;
  }

  if (!global.context[userId] || global.context[userId] === 'chatsDeAtendimento') {
    const menuText = `Você escolheu Chats Inteligentes. Aqui estão as opções disponíveis:\n\n` +
                     `1️⃣ Informações sobre o serviço\n` +
                     `2️⃣ Exemplos de chats inteligentes\n` +
                     `3️⃣ Solicitar uma demonstração\n\n` +
                     `0️⃣ Voltar ao Menu Principal\n` +
                     `✖️ Finalizar Atendimento\n\n` +
                     `Digite a opção desejada.`;

    client.sendText(userId, menuText);
    global.context[userId] = 'chatsDeAtendimento'; // Define o contexto atual para Chats Inteligentes
    return;
  }

  if (message.body === '1') {
    const responseText = `Aqui estão as informações sobre nossos chats inteligentes:\n\n` +
                         `- Criação de chatbots personalizados.\n` +
                         `- Integração com sistemas de atendimento.\n` +
                         `- Respostas automatizadas e personalizadas.\n\n` +
                         `Para mais detalhes, entre em contato com nossa equipe.`;
    client.sendText(userId, responseText);
    return;
  }

  if (message.body === '2') {
    const responseText = `Aqui estão alguns exemplos de chats inteligentes que criamos:\n\n` +
                         `🤖 Exemplo 1: [Link para exemplo]\n` +
                         `💬 Exemplo 2: [Link para exemplo]\n\n` +
                         `Se desejar mais exemplos, por favor, nos avise.`;
    client.sendText(userId, responseText);
    return;
  }

  if (message.body === '3') {
    const responseText = `Você pode solicitar uma demonstração de chats inteligentes.\n\n` +
                         `Por favor, forneça seu e-mail ou telefone para que nossa equipe entre em contato.`;
    client.sendText(userId, responseText);
    return;
  }

  client.sendText(userId, 'Opção inválida. Por favor, escolha uma opção válida.');
};

// Exporta a função
module.exports = { handleChatsDeAtendimento };
