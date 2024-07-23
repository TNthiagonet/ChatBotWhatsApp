// 3_A_cardapioOnline.js
const handleCardapioOnlineA = async (message, client) => {
  const responseText = `Você escolheu a opção A do Cardápio Online. Aqui estão as informações específicas sobre a opção A.`;
  await client.sendText(message.from, responseText);
};

module.exports = { handleCardapioOnlineA };
