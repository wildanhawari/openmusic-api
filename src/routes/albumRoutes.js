const express = require('express');
const validate = require('../middlewares/validator');
const AlbumValidator = require('../validators/AlbumValidator');

const createAlbumRoutes = (albumController) => {
  const router = express.Router();

  router.post(
    '/albums',
    validate(AlbumValidator),
    albumController.createAlbum.bind(albumController)
  );

  router.get('/albums/:id', albumController.getAlbumById.bind(albumController));

  router.put(
    '/albums/:id',
    validate(AlbumValidator),
    albumController.updateAlbum.bind(albumController)
  );

  router.delete('/albums/:id', albumController.deleteAlbum.bind(albumController));

  return router;
};

module.exports = createAlbumRoutes;