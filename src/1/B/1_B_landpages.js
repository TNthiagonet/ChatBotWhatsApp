const landOptionB = async (message, client) => {
  const userId = message.from;
  const responseText = 'Você escolheu a opção B em Land Pages. Aqui estão os exemplos...';
  await client.sendText(userId, responseText);
};

module.exports = { landOptionB };
