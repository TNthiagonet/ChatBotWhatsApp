// 3_C_cardapioOnline.js
const handleCardapioOnlineC = async (message, client) => {
  const responseText = `Você escolheu a opção C do Cardápio Online. Aqui estão as informações específicas sobre a opção C.`;
  await client.sendText(message.from, responseText);
};

module.exports = { handleCardapioOnlineC };
