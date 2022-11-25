const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { requestLogger, errorLogger } = require('./middlewares/logger');

// TODO: Уточнить соответствует ли это требованиям чек-листа
const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;

const router = require('./routes/index');

const app = express();

mongoose.connect(MONGO_URL);

// Parsers
app.use(express.json());
app.use(cookieParser());

// Логгер запросов
app.use(requestLogger);

// Routes
app.use(router);

// Логгер ошибок
app.use(errorLogger);

// Listening
app.listen(PORT, () => {
  console.log(`App listen port ${PORT}`);
});
