export const instOptionB = async (message, client) => {
  try {
    // Simulação de lógica para a opção B de institucionais
    await client.sendText(message.from, 'Você escolheu a opção B de institucionais.');
  } catch (error) {
    console.error('Erro na opção B de institucionais:', error);
  }
};
