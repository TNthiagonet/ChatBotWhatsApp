/**
 * Envia o menu principal para o número fornecido.
 * @param {string} number - O número para o qual o menu principal será enviado.
 */
const sendMainMenu = (number) => {
  // Lógica para enviar o menu principal
  console.log(`Enviando menu principal para ${number}`);
};

/**
 * Encerra o serviço para o número fornecido.
 * @param {string} number - O número para o qual o serviço será encerrado.
 */
const endService = (number) => {
  // Lógica para encerrar o serviço
  console.log(`Serviço encerrado para ${number}`);
};

// Exporta as funções para que possam ser usadas em outros arquivos
module.exports = {
  sendMainMenu,
  endService
};
