const Joi = require('joi');
const ValidationError = require('../errors/ValidationError');

const CollaborationSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

class CollaborationValidator {
  static validatePayload(payload) {
    const { error } = CollaborationSchema.validate(payload);
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = CollaborationValidator;