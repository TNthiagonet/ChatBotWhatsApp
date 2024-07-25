export const landOptionB = async (message, client) => {
  try {
    // Simulação de lógica para a opção B de landpages
    await client.sendText(message.from, 'Você escolheu a opção B de landpages.');
  } catch (error) {
    console.error('Erro na opção B de landpages:', error);
  }
};
