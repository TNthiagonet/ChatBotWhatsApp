const { sendMainMenu, endService } = require('./index');

// Função para lidar com o menu Cardápio Online
const handleCardapioOnline = async (message, client) => {
  const userId = message.from;

  if (message.body === '0') {
    await sendMainMenu(message, client);
    return;
  }

  if (message.body.toLowerCase() === 'x') { // Inclui tanto 'x' quanto 'X'
    await endService(message, client);
    return;
  }

  if (!global.context[userId] || global.context[userId] === 'cardapioOnline') {
    const menuText = `Você escolheu Cardápio Online. Aqui estão as opções disponíveis:\n\n` +
                     `A️⃣ Informações sobre o serviço\n` +
                     `B️⃣ Exemplos de cardápios online\n` +
                     `C️⃣ Contratar\n\n` +
                     `0️⃣ Voltar ao Menu Principal\n` +
                     `✖️ Finalizar Atendimento\n\n` +
                     `Digite a opção desejada.`;

    await client.sendText(userId, menuText);
    global.context[userId] = 'cardapioOnline'; // Define o contexto atual para Cardápio Online
    return;
  }

  switch (message.body.toUpperCase()) {
    case 'A':
      const responseTextA = `Aqui estão as informações sobre nossos cardápios online:\n\n` +
                            `- Criação de cardápios digitais para restaurantes e lanchonetes.\n` +
                            `- Design responsivo e fácil de atualizar.\n` +
                            `- Integração com sistemas de pedidos e pagamentos.\n\n` +
                            `Para mais detalhes, entre em contato com nossa equipe.`;
      await client.sendText(userId, responseTextA);
      break;
    case 'B':
      const responseTextB = `Aqui estão alguns exemplos de cardápios online que criamos:\n\n` +
                            `🌟 Exemplo 1: [https://restauranteexemplo1.com.br]\n` +
                            `🚀 Exemplo 2: [https://restauranteexemplo2.com.br]\n\n` +
                            `Se desejar mais exemplos, por favor, nos avise.`;
      await client.sendText(userId, responseTextB);
      break;
    case 'C':
      const responseTextC = `Para contratar nossos serviços de cardápio online, por favor, entre em contato com nossa equipe comercial:\n\n` +
                            `📞 Telefone: [83 98179-0771]\n` +
                            `📧 E-mail: [contato@thiagonet.com]\n\n` +
                            `Estamos prontos para ajudá-lo a criar um cardápio online eficaz para seu negócio.`;
      await client.sendText(userId, responseTextC);
      break;
    default:
      await client.sendText(userId, 'Opção inválida. Por favor, escolha uma opção válida.');
  }
};

module.exports = { handleCardapioOnline };
