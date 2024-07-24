// src/2/2_institucionais.mjs

// Função para carregar o módulo principal dinamicamente
const loadModule = async () => {
  const indexModule = await import('../../index.js');
  return indexModule;
};

// Importações dos arquivos .mjs
import { instOptionA } from './A/2_A_institucionais.mjs';
import { instOptionB } from './B/2_B_institucionais.mjs';
import { instOptionC } from './C/2_C_institucionais.mjs';

// Função principal para lidar com Institucionais
const institucionais = async (message, client) => {
  const userId = message.from;

  // Verifica se a mensagem é para finalizar o atendimento
  if (message.body.toLowerCase() === 'x') {
    const { endService } = await loadModule();
    await endService(message, client);
    return;
  }

  // Verifica se a mensagem é para voltar ao menu principal
  if (message.body.toLowerCase() === 'm') {
    const { sendMainMenu } = await loadModule();
    await sendMainMenu(message, client);
    return;
  }

  // Verifica se o contexto atual é 'institucionais'
  if (!globalThis.context[userId] || globalThis.context[userId] === 'institucionais') {
    const menuText = `Você escolheu Institucionais. Aqui estão as opções disponíveis:\n\n` +
                     `ⓐ Informações sobre o serviço\n` +
                     `ⓑ Exemplos de páginas institucionais\n` +
                     `ⓒ Contratar\n\n` +
                     `ⓜ Voltar ao Menu Principal\n` +
                     `ⓧ Finalizar Atendimento\n\n` +
                     `Digite a opção desejada.`;

    await client.sendText(userId, menuText);
    globalThis.context[userId] = 'institucionais'; // Define o contexto atual para Institucionais
    return;
  }

  // Processa a opção escolhida pelo usuário
  switch (message.body.toUpperCase()) {
    case 'A':
      await instOptionA(message, client);
      break;
    case 'B':
      await instOptionB(message, client);
      break;
    case 'C':
      await instOptionC(message, client);
      break;
    default:
      await client.sendText(userId, 'Opção inválida. Por favor, escolha uma opção válida.');
  }
};

export { institucionais };
