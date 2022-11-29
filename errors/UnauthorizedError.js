const { ERRORS } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = ERRORS.unauthorized.code;
  }
}

module.exports = UnauthorizedError;
