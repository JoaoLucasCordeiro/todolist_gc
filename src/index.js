// Versão da API: 2.0.0
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
    res.status(201).json({ id: newTask.id });
});

app.get('/', (req, res) => {
    res.send('API de To-Do List rodando!');
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== taskId);
    if (tasks.length === initialLength) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    res.status(200).json({ message: "Taefa deletada corretamente" });
    console.log("Validando conflito!!")
});

app.patch('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).send('Tarefa não encontrada.');
    }
    const { status } = req.body;
    if (status) {
        task.status = status;
    }
    res.status(200).json(task);
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});