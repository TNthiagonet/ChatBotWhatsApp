const { logger } = require('./src/utils/logger');

/**
 * Função de exemplo para demonstração do uso do logger.
 * Você pode substituir esta função por qualquer lógica necessária.
 */
const exampleFunction = () => {
  try {
    // Exemplo de uso do logger
    logger.info('Exemplo de função executada com sucesso.');
  } catch (error) {
    logger.error('Erro na execução da função exemplo:', error);
  }
};

// Chama a função de exemplo
exampleFunction();
