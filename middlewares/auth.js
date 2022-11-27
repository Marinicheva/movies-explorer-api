const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const { ERRORS } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

    req.user = payload;
    next();
  } catch (err) {
    next(new UnauthorizedError(ERRORS.unauthorized.messageDefault));
  }
};

module.exports = { auth };
