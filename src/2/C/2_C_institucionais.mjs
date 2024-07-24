// src/C/2_C_institucionais.mjs

export const instOptionC = async (message, client) => {
  const userId = message.from;
  // Lógica para a opção C do submenu Institucionais
  const responseText = 'Você escolheu a opção C em Institucionais. Aqui estão os detalhes...';
  await client.sendText(userId, responseText);
};
