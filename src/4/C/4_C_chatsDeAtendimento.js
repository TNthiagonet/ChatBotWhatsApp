const chatOptionC = async (message, client) => {
  const userId = message.from;
  const responseText = 'Você escolheu a opção C em Chats. Aqui estão os detalhes...';
  await client.sendText(userId, responseText);
};

module.exports = { chatOptionC };
