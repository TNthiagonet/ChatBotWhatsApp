const instOptionC = async (message, client) => {
  const userId = message.from;
  // Lógica para a opção A do submenu Land Pages
  const responseText = 'Você escolheu a opção A em Institucionais. Aqui estão os detalhes...';
  await client.sendText(userId, responseText);
};

module.exports = { instOptionC };
