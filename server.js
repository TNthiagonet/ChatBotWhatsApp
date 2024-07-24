const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Roteamento e lógica do servidor Express
app.get('/', (req, res) => {
  res.send('Servidor Express está rodando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
