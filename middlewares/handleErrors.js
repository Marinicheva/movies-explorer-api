const { ERRORS } = require('../utils/constants');

const handleErrors = (err, req, res, next) => {
  // Определяем код ошибки (если нет присваиваем дефолтное значение)
  const { statusCode = ERRORS.default.code, message } = err;

  res.status(statusCode)
  // Отправляем текст ошибки (если статус-код по дефолту, то и сообщение дефолтное)
    .send({
      message: statusCode === 500
        ? ERRORS.default.message
        : message,
    });

  next();
};

module.exports = handleErrors;
