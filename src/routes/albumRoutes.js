const express = require('express');
const validate = require('../middlewares/validator');
const AlbumValidator = require('../validators/AlbumValidator');

const createAlbumRoutes = (albumController) => {
  const router = express.Router();

  router.post(
    '/albums',
    validate(AlbumValidator),
    albumController.create.bind(albumController)
  );

  router.get('/albums/:id', albumController.getById.bind(albumController));

  router.put(
    '/albums/:id',
    validate(AlbumValidator),
    albumController.update.bind(albumController)
  );

  router.delete('/albums/:id', albumController.delete.bind(albumController));

  return router;
};

module.exports = createAlbumRoutes;