// src/parseMessage.js

export function parseMessage(message) {
  if (!message || message.trim() === '') {
    throw new Error('Mensagem não pode ser vazia ou apenas espaços');
  }
  return message.trim().toLowerCase();
}
