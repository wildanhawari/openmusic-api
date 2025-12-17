const Joi = require('joi');
const ValidationError = require('../errors/ValidationError');

const UserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

class UserValidator {
  static validatePayload(payload) {
    const { error } = UserSchema.validate(payload);
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = UserValidator;