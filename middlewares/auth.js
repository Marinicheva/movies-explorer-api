const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

    req.user = payload;
    next();
  } catch (err) {
    // TODO: Централизованная обработка ошибок
    console.log(err);
    res.send('Токена нет или он неверный');
  }
};

module.exports = { auth };
