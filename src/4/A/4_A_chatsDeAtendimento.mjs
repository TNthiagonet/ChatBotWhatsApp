// src/A/4_A_chatsDeAtendimento.mjs

export const chatOptionA = async (message, client) => {
  const userId = message.from;
  const responseText = 'Você escolheu a opção A em Chats. Aqui estão os detalhes...';
  await client.sendText(userId, responseText);
};
