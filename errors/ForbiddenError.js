const { ERROR_CODES } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = ERROR_CODES.forbidden;
  }
}

module.exports = ForbiddenError;
