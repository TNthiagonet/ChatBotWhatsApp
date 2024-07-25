export const cardOptionB = async (message, client) => {
  try {
    // Simulação de lógica para a opção B de cardápio online
    await client.sendText(message.from, 'Você escolheu a opção B do cardápio online.');
  } catch (error) {
    console.error('Erro na opção B de cardápio online:', error);
  }
};
