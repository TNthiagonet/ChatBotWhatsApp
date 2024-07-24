// src/1/1_landpages.mjs

// Função para importar módulos dinamicamente
const dynamicImport = async (modulePath) => {
  return import(modulePath);
};

// Função principal para lidar com as opções de Land Pages
export const landpages = async (message, client) => {
  const userId = message.from;

  // Importa as funções necessárias
  const { sendMainMenu, endService } = await dynamicImport('../../index.js'); // Usar import() dinâmico
  const { landOptionA } = await dynamicImport('./A/1_A_landpages.mjs'); // Usar import() dinâmico
  const { landOptionB } = await dynamicImport('./B/1_B_landpages.mjs'); // Usar import() dinâmico
  const { landOptionC } = await dynamicImport('./C/1_C_landpages.mjs'); // Usar import() dinâmico

  // Finaliza o atendimento se a mensagem for 'x'
  if (message.body.toLowerCase() === 'x') {
    await endService(message, client);
    return;
  }

  // Envia o menu principal se a mensagem for 'm'
  if (message.body.toLowerCase() === 'm') {
    await sendMainMenu(message, client);
    return;
  }

  // Se o contexto do usuário não estiver definido ou for 'landpages', exibe o menu de Land Pages
  if (!globalThis.context[userId] || globalThis.context[userId] === 'landpages') {
    const menuText = `Você escolheu Land Pages. Aqui estão as opções disponíveis:\n\n` +
                     `ⓐ Informações sobre o serviço\n` +
                     `ⓑ Exemplos de páginas de land page\n` +
                     `ⓒ Contratar\n\n` +
                     `ⓜ Voltar ao Menu Principal\n` +
                     `ⓧ Finalizar Atendimento\n\n` +
                     `Digite a opção desejada.`;

    await client.sendText(userId, menuText);
    globalThis.context[userId] = 'landpages'; // Define o contexto atual para Land Pages
    return;
  }

  // Redireciona para o arquivo correspondente com base na escolha do submenu
  switch (message.body.toUpperCase()) {
    case 'A':
      await landOptionA(message, client);
      break;
    case 'B':
      await landOptionB(message, client);
      break;
    case 'C':
      await landOptionC(message, client);
      break;
    default:
      await client.sendText(userId, 'Opção inválida. Por favor, escolha uma opção válida.');
  }
};
