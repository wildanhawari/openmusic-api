const BaseError = require('./BaseError');

class AuthorizationError extends BaseError {
  constructor(message) {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

module.exports = AuthorizationError;