// 3_B_cardapioOnline.js
const handleCardapioOnlineB = async (message, client) => {
  const responseText = `Você escolheu a opção B do Cardápio Online. Aqui estão as informações específicas sobre a opção B.`;
  await client.sendText(message.from, responseText);
};

module.exports = { handleCardapioOnlineB };
