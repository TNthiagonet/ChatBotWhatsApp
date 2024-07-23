// 1_B_landpages.js
const handleLandpagesB = async (message, client) => {
  const responseText = `Você escolheu a opção B das Land Pages. Aqui estão as informações específicas sobre a opção B.`;
  await client.sendText(message.from, responseText);
};

module.exports = { handleLandpagesB };
