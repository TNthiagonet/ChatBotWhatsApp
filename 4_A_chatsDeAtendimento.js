// 4_A_chatsDeAtendimento.js
const handleChatsDeAtendimentoA = async (message, client) => {
  const responseText = `Você escolheu a opção A dos Chats Inteligentes. Aqui estão as informações específicas sobre a opção A.`;
  await client.sendText(message.from, responseText);
};

module.exports = { handleChatsDeAtendimentoA };
