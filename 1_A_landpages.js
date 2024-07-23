// 1_A_landpages.js
const handleLandpagesA = async (message, client) => {
  const responseText = `Você escolheu a opção A das Land Pages. Aqui estão as informações específicas sobre a opção A.`;
  await client.sendText(message.from, responseText);
};

module.exports = { handleLandpagesA };
