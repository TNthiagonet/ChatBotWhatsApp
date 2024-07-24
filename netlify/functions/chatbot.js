// netlify/functions/chatbot.js
const { createHandler } = require('@netlify/functions');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', async (req, res) => {
  try {
    const message = req.body.message;
    // Aqui você pode colocar a lógica do seu chatbot
    // Exemplo: Respondendo uma mensagem
    res.json({ reply: `Você disse: ${message}` });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

exports.handler = createHandler(app);
