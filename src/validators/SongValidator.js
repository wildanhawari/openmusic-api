const Joi = require('joi');
const ValidationError = require('../errors/ValidationError');

const SongSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number().integer().optional().allow(null),
  albumId: Joi.string().optional().allow(null)
});

class SongValidator {
  static validatePayload(payload) {
    const { error } = SongSchema.validate(payload);
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = SongValidator;