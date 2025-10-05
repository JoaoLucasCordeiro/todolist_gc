const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [
    { id: 1, titulo: "Estudar Git", descricao: "Aprofundar os conhecimentos em Git Flow.", status: "não finalizado" }
];
let nextId = 2;

app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

app.post('/tasks', (req, res) => {
    const { titulo, descricao } = req.body;
    if (!titulo) {
        return res.status(400).json({ error: "O título é obrigatório." });
    }
    const newTask = { id: nextId++, titulo, descricao: descricao || '', status: "não finalizado" };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.get('/', (req, res) => {
    res.send('API de To-Do List rodando!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});