export const instOptionC = async (message, client) => {
  try {
    // Simulação de lógica para a opção C de institucionais
    await client.sendText(message.from, 'Você escolheu a opção C de institucionais.');
  } catch (error) {
    console.error('Erro na opção C de institucionais:', error);
  }
};
