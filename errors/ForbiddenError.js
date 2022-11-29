const { ERRORS } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = ERRORS.forbidden.code;
  }
}

module.exports = ForbiddenError;
