const express = require('express');
const mongoose = require('mongoose');

// TODO: Уточнить соответствует ли это требованиям чек-листа
const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;

const router = require('./routes/index');

const app = express();

mongoose.connect(DB_URL);

// Parsers
app.use(express.json());

// Routes
app.use(router);

// Listening
app.listen(PORT, () => {
  console.log(`App listen port ${PORT}`);
});
