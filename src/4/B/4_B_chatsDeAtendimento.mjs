export const chatOptionB = async (message, client) => {
  try {
    // Simulação de lógica para a opção B de chats de atendimento
    await client.sendText(message.from, 'Você escolheu a opção B de chats de atendimento.');
  } catch (error) {
    console.error('Erro na opção B de chats de atendimento:', error);
  }
};
