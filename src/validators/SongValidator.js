const Joi = require('joi');

const SongSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().integer().required(),
    genre: Joi.string().required(),
    performer: Joi.string().required(),
    duration: Joi.number().integer().optional().allow(null),
    albumId: Joi.string().optional().allow(null)
});

function validateSong(payload) {
  const { error } = SongSchema.validate(payload);
  if (error) throw new ValidationError(error.message);
}

module.exports = { validateSong };