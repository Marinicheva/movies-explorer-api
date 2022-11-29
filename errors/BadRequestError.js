const { ERRORS } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = ERRORS.badRequest.code;
  }
}

module.exports = BadRequestError;
