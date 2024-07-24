const landOptionA = async (message, client) => {
  const userId = message.from;
  const responseText = 'Você escolheu a opção A em Land Pages. Aqui estão os detalhes...';
  await client.sendText(userId, responseText);
};

module.exports = { landOptionA };
