const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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

// TODO: Ошибка при ненахождении email и при несоответствии пароля
// TODO д.б. одинаковая, чтобы злоумышленники ничего не поняли

userSchema.statics.findByCredentials = function (email, hashPassword) {
  return this.findOne({ email }).select('+password')
    .orFail(new Error('Пользователя с таким email не найдено'))
    .then((user) => bcrypt
      .compare(hashPassword, user.password)
      .then((match) => {
        if (!match) {
          return Promise.reject(new Error('А вот и неправильный пароль'));
        }
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
