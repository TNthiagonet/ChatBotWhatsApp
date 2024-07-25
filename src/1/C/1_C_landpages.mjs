export const landOptionC = async (message, client) => {
  try {
    // Simulação de lógica para a opção C de landpages
    await client.sendText(message.from, 'Você escolheu a opção C de landpages.');
  } catch (error) {
    console.error('Erro na opção C de landpages:', error);
  }
};
