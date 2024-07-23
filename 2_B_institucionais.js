// 2_B_institucionais.js
const handleInstitucionaisB = async (message, client) => {
  const responseText = `Você escolheu a opção B dos Institucionais. Aqui estão as informações específicas sobre a opção B.`;
  await client.sendText(message.from, responseText);
};

module.exports = { handleInstitucionaisB };
