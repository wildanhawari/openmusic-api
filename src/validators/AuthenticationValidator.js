const Joi = require('joi');
const ValidationError = require('../errors/ValidationError');

const PostAuthenticationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const PutAuthenticationSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const DeleteAuthenticationSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

class AuthenticationValidator {
  static validatePostPayload(payload) {
    const { error } =  PostAuthenticationSchema.validate(payload);
    if (error) {
      throw new ValidationError(error.message);
    }
  }

  static validatePutPayload(payload) {
    const { error } = PutAuthenticationSchema.validate(payload);
    if (error) {
      throw new ValidationError(error.message);
    }
  }

  static validateDeletePayload(payload) {
    const { error } = DeleteAuthenticationSchema.validate(payload);
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = AuthenticationValidator;