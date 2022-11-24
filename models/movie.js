const mongoose = require('mongoose');
const validator = require('validator');

const movieShema = new mongoose.Schema({
  country: {
    type: String,
    require: [true, 'Поле country является обязательным'],
  },
  director: {
    type: String,
    require: [true, 'Поле director является обязательным'],
  },
  duration: {
    type: Number,
    require: [true, 'Поле duration является обязательным'],
  },
  year: {
    type: String,
    require: [true, 'Поле year является обязательным'],
  },
  description: {
    type: String,
    require: [true, 'Поле description является обязательным'],
  },
  image: {
    type: String,
    require: [true, 'Поле image является обязательным'],
    validate: {
      isValid: (value) => validator.isURL(value),
      message: 'Значение image должно быть ссылкой, введеное значение является некорректным',
    },
  },
  trailerLink: {
    type: String,
    require: [true, 'Поле trailerLink является обязательным'],
    validate: {
      isValid: (value) => validator.isURL(value),
      message: 'Значение trailerLink должно быть ссылкой, введеное значение является некорректным',
    },
  },
  thumbnail: {
    type: String,
    require: [true, 'Поле thumbnail является обязательным'],
    validate: {
      isValid: (value) => validator.isURL(value),
      message: 'Значение thumbnail должно быть ссылкой, введеное значение является некорректным',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле owner является обязательным'],
  },
  movieId: {
    type: String,
    require: [true, 'Поле movieId является обязательным'],
  },
  nameRU: {
    type: String,
    require: [true, 'Поле nameRU является обязательным'],
    // TODO: Подумать нужна ли тут валидация
    // validate: {
    //   isValid: (value) => /[?!,.А-яа-яЁё0-9\-\s]+/g.test(value),
    //   message: 'Поле nameRU может содержать только кириллицу',
    // },
  },
  nameEN: {
    type: String,
    require: [true, 'Поле nameEN является обязательным'],
  },
});

module.exports = mongoose.model('movie', movieShema);
