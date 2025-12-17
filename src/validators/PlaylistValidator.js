const Joi = require('joi');
const ValidationError = require('../errors/ValidationError');

const PlaylistSchema = Joi.object({
  name: Joi.string().required(),
});

const PlaylistSongSchema = Joi.object({
  songId: Joi.string().required(),
});

class PlaylistValidator {
  static validatePlaylistPayload(payload) {
    const { error } = PlaylistSchema.validate(payload);
    if (error) {
      throw new ValidationError(error.message);
    }
  }

  static validatePlaylistSongPayload(payload) {
    const { error } = PlaylistSongSchema.validate(payload);
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = PlaylistValidator;