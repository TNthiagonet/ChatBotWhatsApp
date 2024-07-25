export const landOptionA = async (message, client) => {
  try {
    // Simulação de lógica para a opção A de landpages
    await client.sendText(message.from, 'Você escolheu a opção A de landpages.');
  } catch (error) {
    console.error('Erro na opção A de landpages:', error);
  }
};
