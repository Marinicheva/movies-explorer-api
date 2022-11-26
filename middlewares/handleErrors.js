const handleErrors = (err, req, res, next) => {
  // Определяем код ошибки (если нет присваиваем дефолтное значение)
  const { statusCode = 500, message } = err;

  res.status(statusCode)
  // Отправляем текст ошибки (если статус-код по дефолту, то и сообщение дефолтное)
    .send({
      message: statusCode === 500
        ? 'На сервера произошла ошибка'
        : message,
    });

  next();
};

module.exports = handleErrors;
