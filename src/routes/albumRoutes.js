const express = require('express');
const validate = require('../middlewares/validator');
const AlbumValidator = require('../validators/AlbumValidator');
const authenticate = require('../middlewares/authenticate');
const multer = require('multer');
const ValidationError = require('../errors/ValidationError');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 512000,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new ValidationError('Only images are allowed'), false);
    }
  },
});

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

  router.post(
    '/albums/:id/covers',
    (req, res, next) => {
      upload.single('cover')(req, res, (err) => {
        if (err) {
          if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({
              status: 'fail',
              message: 'Ukuran file terlalu besar. Maksimal 512KB',
            });
          }
          return next(err);
        }
        next();
      });
    },
    albumController.updateAlbumCover.bind(albumController)
  );

  router.post(
    '/albums/:id/likes',
    authenticate,
    albumController.likeAlbum.bind(albumController)
  );

  router.delete(
    '/albums/:id/likes',
    authenticate,
    albumController.unlikeAlbum.bind(albumController)
  );

  router.get(
    '/albums/:id/likes',
    albumController.getAlbumLikes.bind(albumController)
  );

  return router;
};

module.exports = createAlbumRoutes;