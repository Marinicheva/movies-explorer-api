const { ERROR_CODES } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = ERROR_CODES.notFound;
  }
}

module.exports = NotFoundError;
