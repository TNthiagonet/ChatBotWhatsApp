// 4_B_chatsDeAtendimento.js
const handleChatsDeAtendimentoB = async (message, client) => {
  const responseText = `Você escolheu a opção B dos Chats Inteligentes. Aqui estão as informações específicas sobre a opção B.`;
  await client.sendText(message.from, responseText);
};

module.exports = { handleChatsDeAtendimentoB };
