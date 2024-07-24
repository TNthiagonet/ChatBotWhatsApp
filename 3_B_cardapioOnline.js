const cardOptionB = async (message, client) => {
  const userId = message.from;
  const responseText = 'Você escolheu a opção B em Cardápio. Aqui estão os detalhes...';
  await client.sendText(userId, responseText);
};

module.exports = { cardOptionB };
