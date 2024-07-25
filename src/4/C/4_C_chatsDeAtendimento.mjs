export const chatOptionC = async (message, client) => {
  try {
    // Simulação de lógica para a opção C de chats de atendimento
    await client.sendText(message.from, 'Você escolheu a opção C de chats de atendimento.');
  } catch (error) {
    console.error('Erro na opção C de chats de atendimento:', error);
  }
};
