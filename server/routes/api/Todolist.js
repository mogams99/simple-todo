const { Router } = require('express');
const Todo = require('../../models/Todo');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        if (!todos) throw new Error('Tidak ada item');
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
        description: req.body.description,
    });

    try {
        const todo = await newTodo.save();
        if (!todo) throw new Error('Ada kesalahan saat menyimpan item');
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const removed = await Todo.findByIdAndDelete(id);
        if (!removed) throw new Error('Ada kesalahan saat menghapus item');
        res.status(200).json(removed);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;