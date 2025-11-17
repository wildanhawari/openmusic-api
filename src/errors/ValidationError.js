const BaseError = require('./BaseError');

class ValidationError extends BaseError {
  constructor(message) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

module.exports = ValidationError;