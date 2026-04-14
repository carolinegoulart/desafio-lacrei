const express = require('express');
const app = express();
const statusRouter = require('./routes/status');

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const port = process.env.PORT || 3000;

// Rotas da aplicação
app.use('/status', statusRouter);

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
