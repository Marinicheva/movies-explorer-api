const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

// Регистрация пользователя
const createUser = async (req, res) => {
  const { email, password, name } = req.body;
  const hash = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ email, password: hash, name });

    const createdUser = { email: user.email, name: user.name };

    res.staus(201)
      .send(createdUser);
  } catch (err) {
    // TODO: Обрабатываем ошибку !!! централизованно и понятно !!!
    console.log(err);
    const message = err.keyValue.email;
    // TODO: Это для E11000
    res.send({ message: `Пользоавтель с email ${message} уже существует` });
  }
};

// Авторизация пользователя
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    res.cookie('token', token, {
      maxAge: 3600000,
      httpOnly: true,
    })
      .send({ message: 'Авторизация прошла успешно' });
  } catch (err) {
    // TODO: Централизованный обрабочик
    console.log(err, err.message);
    res.status(err.code)
      .send({ message: err.message });
  }
};

// Разлогин пользователя
// TODO: Нужен ли тут обработчик ошибок ???
const logoutUser = (req, res) => {
  res.clearCookie('token')
    .send({ message: 'Пока-пока! Приходите снова' });
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
};
