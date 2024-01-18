const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const TodoListRoutes = require('./routes/api/Todolist');
const path = require('path');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/simple-todo');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Koneksi error:'));
db.once('open', function() {
    console.log('Koneksi terhubung ke MongoDB...');
});

// app.get('/', (req, res) => res.send('Selamat datang...'));
app.use('/api/todoList', TodoListRoutes)

const port = 3000;
app.listen(port, () => console.log(`Port aktif di:${port}...`));