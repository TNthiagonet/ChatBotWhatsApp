// 2_A_institucionais.js
const handleInstitucionaisA = async (message, client) => {
  const responseText = `Você escolheu a opção A dos Institucionais. Aqui estão as informações específicas sobre a opção A.`;
  await client.sendText(message.from, responseText);
};

module.exports = { handleInstitucionaisA };
