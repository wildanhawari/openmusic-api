const Joi = require('joi');
const ValidationError = require('../errors/ValidationError');

const ExportPlaylistSchema = Joi.object({
  targetEmail: Joi.string().email().required(),
});

class ExportValidator {
  static validatePayload(payload) {
    const { error } = ExportPlaylistSchema.validate(payload);
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = ExportValidator;