const { sendMainMenu, endService } = require('./index');

// Função para lidar com o menu Institucionais
const handleInstitucionais = async (message, client) => {
  const userId = message.from;

  if (message.body === '0') {
    await sendMainMenu(message, client);
    return;
  }

  if (message.body.toLowerCase() === 'x') { // Inclui tanto 'x' quanto 'X'
    await endService(message, client);
    return;
  }

  if (!global.context[userId] || global.context[userId] === 'institucionais') {
    const menuText = `Você escolheu Institucionais. Aqui estão as opções disponíveis:\n\n` +
                     `A️⃣ Informações sobre o serviço\n` +
                     `B️⃣ Exemplos de páginas institucionais\n` +
                     `C️⃣ Contratar\n\n` +
                     `0️⃣ Voltar ao Menu Principal\n` +
                     `✖️ Finalizar Atendimento\n\n` +
                     `Digite a opção desejada.`;

    await client.sendText(userId, menuText);
    global.context[userId] = 'institucionais'; // Define o contexto atual para Institucionais
    return;
  }

  switch (message.body.toUpperCase()) {
    case 'A':
      const responseTextA = `Aqui estão as informações sobre nossas páginas institucionais:\n\n` +
                            `- Criação de páginas sobre a empresa, produtos e serviços.\n` +
                            `- Design que transmite profissionalismo e confiança.\n` +
                            `- Integração com redes sociais e ferramentas de marketing.\n\n` +
                            `Para mais detalhes, entre em contato com nossa equipe.`;
      await client.sendText(userId, responseTextA);
      break;
    case 'B':
      const responseTextB = `Aqui estão alguns exemplos de páginas institucionais que criamos:\n\n` +
                            `🌟 Exemplo 1: [https://empresaexemplo1.com.br]\n` +
                            `🚀 Exemplo 2: [https://empresaexemplo2.com.br]\n\n` +
                            `Se desejar mais exemplos, por favor, nos avise.`;
      await client.sendText(userId, responseTextB);
      break;
    case 'C':
      const responseTextC = `Para contratar nossos serviços de páginas institucionais, por favor, entre em contato com nossa equipe comercial:\n\n` +
                            `📞 Telefone: [83 98179-0771]\n` +
                            `📧 E-mail: [contato@thiagonet.com]\n\n` +
                            `Estamos prontos para ajudá-lo a criar uma página institucional eficaz para sua empresa.`;
      await client.sendText(userId, responseTextC);
      break;
    default:
      await client.sendText(userId, 'Opção inválida. Por favor, escolha uma opção válida.');
  }
};

module.exports = { handleInstitucionais };
