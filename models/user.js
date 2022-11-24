const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле e-mail является обязательным'],
    unique: true,
    validate: (value) => {
      if (validator.isEmail(value)) {
        return true;
      }
      return false;
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password является обязательным'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле name является обязательным'],
    minlength: 2,
    maxlength: 30,
  },
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
