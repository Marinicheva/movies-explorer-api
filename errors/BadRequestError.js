const { ERROR_CODES } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = ERROR_CODES.badRequest;
  }
}

module.exports = BadRequestError;