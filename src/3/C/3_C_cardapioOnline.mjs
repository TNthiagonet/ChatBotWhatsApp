// src/C/3_C_cardapioOnline.mjs

export const cardOptionC = async (message, client) => {
  const userId = message.from;
  const responseText = 'Você escolheu a opção C em Cardápio. Aqui estão os detalhes...';
  await client.sendText(userId, responseText);
};
