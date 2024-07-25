export const chatOptionA = async (message, client) => {
  try {
    // Simulação de lógica para a opção A de chats de atendimento
    await client.sendText(message.from, 'Você escolheu a opção A de chats de atendimento.');
  } catch (error) {
    console.error('Erro na opção A de chats de atendimento:', error);
  }
};
