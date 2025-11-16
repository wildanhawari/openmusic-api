const express = require('express');
const validate = require('../middlewares/validator');
const SongValidator = require('../validators/SongValidator');

const createSongRoutes = (songController) => {
  const router = express.Router();

  router.post(
    '/songs',
    validate(SongValidator),
    songController.createSong.bind(songController)
  );

  router.get('/songs', songController.getSongs.bind(songController));

  router.get('/songs/:id', songController.getSongById.bind(songController));

  router.put(
    '/songs/:id',
    validate(SongValidator),
    songController.updateSong.bind(songController)
  );

  router.delete('/songs/:id', songController.deleteSong.bind(songController));

  return router;
};

module.exports = createSongRoutes;