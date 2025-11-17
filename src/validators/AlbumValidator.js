const Joi = require('joi');
const ValidationError = require('../errors/ValidationError');

const AlbumSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().required()
});

class AlbumValidator {
  static validatePayload(payload) {
    const { error } = AlbumSchema.validate(payload);
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = AlbumValidator;