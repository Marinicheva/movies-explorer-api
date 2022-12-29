const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { DEV_SECRET_TOKEN } = require('../utils/constants');

const { ERRORS } = require('../utils/constants');
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
      next(new BadRequestError(ERRORS.badRequest.messageDefault));
    } else if (err.code === 11000) {
      next(new ConflictError(ERRORS.conflict.message));
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
      NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET_TOKEN,
      { expiresIn: '7d' },
    );

    res.cookie('token', token, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
      .send({ message: 'Авторизация прошла успешно', token });
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
      .orFail(new NotFoundError(ERRORS.notFound.messageUserID));

    res.send(user);
  } catch (err) {
    next(err);
  }
};

// Обновление информации о пользователе
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
      .orFail(new NotFoundError(ERRORS.notFound.messageUserID));

    res.send(updatedUser);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(ERRORS.badRequest.messageDefault));
    } else if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError(ERRORS.badRequest.messageUserId));
    } else if (err.code === 11000) {
      next(new ConflictError(ERRORS.conflict.message));
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
