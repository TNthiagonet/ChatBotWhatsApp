export const instOptionA = async (message, client) => {
  try {
    // Simulação de lógica para a opção A de institucionais
    await client.sendText(message.from, 'Você escolheu a opção A de institucionais.');
  } catch (error) {
    console.error('Erro na opção A de institucionais:', error);
  }
};
