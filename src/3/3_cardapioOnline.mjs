// Função para carregar o módulo principal dinamicamente
const loadModule = async () => {
  const indexModule = await import('../../index.js');
  return indexModule;
};

// Importações dos arquivos .mjs
import { cardOptionA } from './A/3_A_cardapioOnline.mjs';
import { cardOptionB } from './B/3_B_cardapioOnline.mjs';
import { cardOptionC } from './C/3_C_cardapioOnline.mjs';

// Função principal para lidar com o Cardápio Online
const cardapioOnline = async (message, client) => {
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

  // Verifica se o contexto atual é 'cardapioOnline'
  if (!globalThis.context[userId] || globalThis.context[userId] === 'cardapioOnline') {
    const menuText = `Você escolheu Cardápio Online. Aqui estão as opções disponíveis:\n\n` +
                     `ⓐ Informações sobre o serviço\n` +
                     `ⓑ Exemplos de cardápios online\n` +
                     `ⓒ Contratar\n\n` +
                     `ⓜ Voltar ao Menu Principal\n` +
                     `ⓧ Finalizar Atendimento\n\n` +
                     `Digite a opção desejada.`;

    await client.sendText(userId, menuText);
    globalThis.context[userId] = 'cardapioOnline'; // Define o contexto atual para Cardápio Online
    return;
  }

  // Processa a opção escolhida pelo usuário
  switch (message.body.toUpperCase()) {
    case 'A':
      await cardOptionA(message, client);
      break;
    case 'B':
      await cardOptionB(message, client);
      break;
    case 'C':
      await cardOptionC(message, client);
      break;
    default:
      await client.sendText(userId, 'Opção inválida. Por favor, escolha uma opção válida.');
  }
};

export { cardapioOnline };
