const chatOptionB = async (message, client) => {
  const userId = message.from;
  const responseText = 'Você escolheu a opção B em Chats. Aqui estão os detalhes...';
  await client.sendText(userId, responseText);
};

module.exports = { chatOptionB };
