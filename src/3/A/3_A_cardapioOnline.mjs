export const cardOptionA = async (message, client) => {
  try {
    // Simulação de lógica para a opção A de cardápio online
    await client.sendText(message.from, 'Você escolheu a opção A do cardápio online.');
  } catch (error) {
    console.error('Erro na opção A de cardápio online:', error);
  }
};
