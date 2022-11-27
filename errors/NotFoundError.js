const { ERRORS } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = ERRORS.notFound.code;
  }
}

module.exports = NotFoundError;
