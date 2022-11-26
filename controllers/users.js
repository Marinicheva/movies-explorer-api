const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

// Регистрация пользователя
const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hash, name });

    const createdUser = { email: user.email, name: user.name };

    res.status(201)
      .send(createdUser);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const errorField = err.message.split(': ').splice(1, 1).join('');
      next(new BadRequestError(`Данные в поле ${errorField} не переданы или переданы некорректные`));
    } else if (err.code === 11000) {
      const conflictEmail = err.keyValue.email;
      next(new ConflictError(`Пользователь с ${conflictEmail} уже существует`));
    } else {
      next(err);
    }
  }
};

// Авторизация пользователя
const loginUser = async (req, res, next) => {
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
    next(err);
  }
};

// Разлогин пользователя
const logoutUser = (req, res) => {
  res.clearCookie('token')
    .send({ message: 'Пока-пока! Приходите снова' });
};

// Получение информации о пользователе
const getUserInfo = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId)
      .orFail(new NotFoundError('Пользователь с таким id не найден'));

    res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail(new NotFoundError('Пользователь с указанным id не найден'));

    res.send(updatedUser);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const errorField = err.message.split(': ').splice(1, 1).join('');
      next(new BadRequestError(`Данные в поле ${errorField} не переданы или переданы некорректные`));
    } else if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Некорректный id пользователя'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getUserInfo,
  updateUserInfo,
};
