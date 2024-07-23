// 1_C_landpages.js
const handleLandpagesC = async (message, client) => {
  const responseText = `Você escolheu a opção C das Land Pages. Aqui estão as informações específicas sobre a opção C.`;
  await client.sendText(message.from, responseText);
};

module.exports = { handleLandpagesC };
