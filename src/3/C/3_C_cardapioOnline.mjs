export const cardOptionC = async (message, client) => {
  try {
    // Simulação de lógica para a opção C de cardápio online
    await client.sendText(message.from, 'Você escolheu a opção C do cardápio online.');
  } catch (error) {
    console.error('Erro na opção C de cardápio online:', error);
  }
};
