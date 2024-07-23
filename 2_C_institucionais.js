// 2_C_institucionais.js
const handleInstitucionaisC = async (message, client) => {
  const responseText = `Você escolheu a opção C dos Institucionais. Aqui estão as informações específicas sobre a opção C.`;
  await client.sendText(message.from, responseText);
};

module.exports = { handleInstitucionaisC };
