const landOptionC = async (message, client) => {
  const userId = message.from;
  const responseText = 'Você escolheu a opção C em Land Pages. Para contratar nossos serviços...';
  await client.sendText(userId, responseText);
};

module.exports = { landOptionC };
