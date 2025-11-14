const express = require('express');
const validate = require('../middlewares/validator');
const SongValidator = require('../validators/SongValidator');

const createSongRoutes = (songController) => {
  const router = express.Router();

  router.post(
    '/songs',
    validate(SongValidator),
    songController.create.bind(songController)
  );

  router.get('/songs', songController.getAll.bind(songController));

  router.get('/songs/:id', songController.getById.bind(songController));

  router.put(
    '/songs/:id',
    validate(SongValidator),
    songController.update.bind(songController)
  );

  router.delete('/songs/:id', songController.delete.bind(songController));

  return router;
};

module.exports = createSongRoutes;