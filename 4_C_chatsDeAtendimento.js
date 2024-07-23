// 4_C_chatsDeAtendimento.js
const handleChatsDeAtendimentoC = async (message, client) => {
  const responseText = `Você escolheu a opção C dos Chats Inteligentes. Aqui estão as informações específicas sobre a opção C.`;
  await client.sendText(message.from, responseText);
};

module.exports = { handleChatsDeAtendimentoC };
