const mongoose = require('mongoose');
const validator = require('validator');

const movieShema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле country является обязательным'],
  },
  director: {
    type: String,
    required: [true, 'Поле director является обязательным'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле duration является обязательным'],
  },
  year: {
    type: String,
    required: [true, 'Поле year является обязательным'],
  },
  description: {
    type: String,
    required: [true, 'Поле description является обязательным'],
  },
  image: {
    type: String,
    required: [true, 'Поле image является обязательным'],
    validate: (value) => {
      if (validator.isURL(value)) {
        return true;
      }
      return false;
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле trailerLink является обязательным'],
    validate: (value) => {
      if (validator.isURL(value)) {
        return true;
      }
      return false;
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле thumbnail является обязательным'],
    validate: (value) => {
      if (validator.isURL(value)) {
        return true;
      }
      return false;
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле owner является обязательным'],
  },
  movieId: {
    type: String,
    required: [true, 'Поле movieId является обязательным'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле nameRU является обязательным'],
    // TODO: Подумать нужна ли тут валидация
    // validate: (value) =>  {
    //   if (/[?!,.А-яа-яЁё0-9\-\s]+/g.test(value)) {
    //   return true;
    // },
    // return false;
    // },
  },
  nameEN: {
    type: String,
    required: [true, 'Поле nameEN является обязательным'],
  },
});

module.exports = mongoose.model('movie', movieShema);
