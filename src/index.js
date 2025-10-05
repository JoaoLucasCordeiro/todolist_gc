const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Nosso "banco de dados" em memória
let tasks = [
    { id: 1, titulo: "Estudar Git", descricao: "Aprofundar os conhecimentos em Git Flow.", status: "não finalizado" }
];
let nextId = 2;

app.get('/', (req, res) => {
    res.send('API de To-Do List rodando!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});