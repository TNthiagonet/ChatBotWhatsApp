exports.handle = (message, client) => {
    if (message.body === '0') {
      client.sendText(message.from, 'Menu Principal:\n1. LandPages\n2. Páginas Institucionais\n3. Cardápio Online\n4. Chats de Atendimento');
    } else if (message.body === 'x') {
      client.sendText(message.from, 'Atendimento Finalizado.');
    } else {
      client.sendText(message.from, 'Submenu Chats de Atendimento:\n1. Opção 1\n2. Opção 2\n3. Opção 3\n0. Menu principal\nx. Finalizar');
    }
  };
  