// tests/parseMessage.test.js

describe('parseMessage', () => {
    let parseMessage;
  
    beforeAll(async () => {
      const module = await import('../src/parseMessage.js');
      parseMessage = module.parseMessage;
    });
  
    test('deve lançar um erro se a mensagem for vazia', () => {
      expect(() => parseMessage('')).toThrow('Mensagem não pode ser vazia ou apenas espaços');
    });
  
    test('deve lançar um erro se a mensagem for apenas espaços', () => {
      expect(() => parseMessage('   ')).toThrow('Mensagem não pode ser vazia ou apenas espaços');
    });
  
    test('deve retornar a mensagem em minúsculas e sem espaços nas extremidades', () => {
      expect(parseMessage('  Olá Mundo  ')).toBe('olá mundo');
    });
  });
  