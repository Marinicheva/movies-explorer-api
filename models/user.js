const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Поле e-mail является обязательным'],
    unique: true,
    validate: {
      isValid: (value) => validator.isEmail(value),
      message: (value) => `${value} не является e-mail`,
    },
  },
  password: {
    type: String,
    require: [true, 'Поле password является обязательным'],
    select: false,
  },
  name: {
    type: String,
    require: [true, 'Поле name является обязательным'],
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
