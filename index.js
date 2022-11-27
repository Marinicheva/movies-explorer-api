const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const limiter = require('./middlewares/requestsLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const handleErrors = require('./middlewares/handleErrors');

const { MONGO_BASE_URL } = require('./utils/constants');

const { PORT = 3000, MONGO_URL = MONGO_BASE_URL } = process.env;

const app = express();

// Parsers
app.use(express.json());
app.use(cookieParser());

mongoose.connect(MONGO_URL);

// Логгер запросов
app.use(requestLogger);

// Лимитер и хелмет
app.use(limiter);
app.use(helmet());

// Роут
app.use(router);

// Логгер ошибок
app.use(errorLogger);

// Обработчики ошибок
app.use(errors());
app.use(handleErrors);

// Listening
app.listen(PORT);
