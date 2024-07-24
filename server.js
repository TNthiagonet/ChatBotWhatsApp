const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para lidar com o corpo das requisições
app.use(express.json());

// Roteamento e lógica do servidor Express
app.get('/', (req, res) => {
  res.send('Servidor Express está rodando!');
});

// Adicione outras rotas ou middleware conforme necessário

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
