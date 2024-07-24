// src/B/2_B_institucionais.mjs

export const instOptionB = async (message, client) => {
  const userId = message.from;
  // Lógica para a opção B do submenu Institucionais
  const responseText = 'Você escolheu a opção B em Institucionais. Aqui estão os detalhes...';
  await client.sendText(userId, responseText);
};
