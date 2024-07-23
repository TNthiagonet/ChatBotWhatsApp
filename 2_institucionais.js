const { sendMainMenu, endService } = require('./index');

const handleInstitucionais = (message, client) => {
  const userId = message.from;

  if (message.body === '0') {
    sendMainMenu(message, client);
    return;
  }

  if (message.body.toLowerCase() === 'x') { // Inclui tanto 'x' quanto 'X'
    endService(message, client);
    return;
  }

  if (!global.context[userId] || global.context[userId] === 'institucionais') {
    const menuText = `Você escolheu Institucionais. Aqui estão as opções disponíveis:\n\n` +
                     `1️⃣ Informações sobre o serviço\n` +
                     `2️⃣ Exemplos de páginas institucionais\n` +
                     `3️⃣ Solicitar uma demonstração\n\n` +
                     `0️⃣ Voltar ao Menu Principal\n` +
                     `✖️ Finalizar Atendimento\n\n` +
                     `Digite a opção desejada.`;

    client.sendText(userId, menuText);
    global.context[userId] = 'institucionais'; // Define o contexto atual para Institucionais
    return;
  }

  if (message.body === '1') {
    const responseText = `Aqui estão as informações sobre nossas páginas institucionais:\n\n` +
                         `- Criação de páginas institucionais personalizadas.\n` +
                         `- Design otimizado para apresentar informações da empresa.\n` +
                         `- Integração com ferramentas de análise e SEO.\n\n` +
                         `Para mais detalhes, entre em contato com nossa equipe.`;
    client.sendText(userId, responseText);
    return;
  }

  if (message.body === '2') {
    const responseText = `Aqui estão alguns exemplos de páginas institucionais que criamos:\n\n` +
                         `🏢 Exemplo 1: [Link para exemplo]\n` +
                         `📊 Exemplo 2: [Link para exemplo]\n\n` +
                         `Se desejar mais exemplos, por favor, nos avise.`;
    client.sendText(userId, responseText);
    return;
  }

  if (message.body === '3') {
    const responseText = `Você pode solicitar uma demonstração de páginas institucionais.\n\n` +
                         `Por favor, forneça seu e-mail ou telefone para que nossa equipe entre em contato.`;
    client.sendText(userId, responseText);
    return;
  }

  client.sendText(userId, 'Opção inválida. Por favor, escolha uma opção válida.');
};

// Exporta a função
module.exports = { handleInstitucionais };
