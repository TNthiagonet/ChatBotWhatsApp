const { sendMainMenu, endService } = require('./index');

const handleCardapioOnline = (message, client) => {
  const userId = message.from;

  if (message.body === '0') {
    sendMainMenu(message, client);
    return;
  }

  if (message.body.toLowerCase() === 'x') { // Inclui tanto 'x' quanto 'X'
    endService(message, client);
    return;
  }

  if (!global.context[userId] || global.context[userId] === 'cardapioOnline') {
    const menuText = `Você escolheu Cardápio Online. Aqui estão as opções disponíveis:\n\n` +
                     `1️⃣ Informações sobre o serviço\n` +
                     `2️⃣ Exemplos de cardápios online\n` +
                     `3️⃣ Solicitar uma demonstração\n\n` +
                     `0️⃣ Voltar ao Menu Principal\n` +
                     `✖️ Finalizar Atendimento\n\n` +
                     `Digite a opção desejada.`;

    client.sendText(userId, menuText);
    global.context[userId] = 'cardapioOnline'; // Define o contexto atual para Cardápio Online
    return;
  }

  if (message.body === '1') {
    const responseText = `Aqui estão as informações sobre nossos cardápios online:\n\n` +
                         `- Criação de cardápios digitais e interativos.\n` +
                         `- Design otimizado para facilitar a visualização e navegação.\n` +
                         `- Atualizações e integração com seu sistema de pedidos.\n\n` +
                         `Para mais detalhes, entre em contato com nossa equipe.`;
    client.sendText(userId, responseText);
    return;
  }

  if (message.body === '2') {
    const responseText = `Aqui estão alguns exemplos de cardápios online que criamos:\n\n` +
                         `📜 Exemplo 1: [Link para exemplo]\n` +
                         `🍽️ Exemplo 2: [Link para exemplo]\n\n` +
                         `Se desejar mais exemplos, por favor, nos avise.`;
    client.sendText(userId, responseText);
    return;
  }

  if (message.body === '3') {
    const responseText = `Você pode solicitar uma demonstração de cardápios online.\n\n` +
                         `Por favor, forneça seu e-mail ou telefone para que nossa equipe entre em contato.`;
    client.sendText(userId, responseText);
    return;
  }

  client.sendText(userId, 'Opção inválida. Por favor, escolha uma opção válida.');
};

// Exporta a função
module.exports = { handleCardapioOnline };
