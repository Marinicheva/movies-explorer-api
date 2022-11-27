const { ERRORS } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = ERRORS.conflict.code;
  }
}

module.exports = ConflictError;
