const express = require('express');
const authenticate = require('../middlewares/authenticate');
const PlaylistValidator = require('../validators/PlaylistValidator');

const createPlaylistRoutes = (playlistController) => {
  const router = express.Router();

  router.post('/playlists', authenticate, (req, res, next) => {
    try {
      PlaylistValidator.validatePlaylistPayload(req.body);
      playlistController.createPlaylist(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/playlists',
    authenticate,
    playlistController.getPlaylists.bind(playlistController)
  );

  router.delete(
    '/playlists/:id',
    authenticate,
    playlistController.deletePlaylist.bind(playlistController)
  );

  router.post('/playlists/:id/songs', authenticate, (req, res, next) => {
    try {
      PlaylistValidator.validatePlaylistSongPayload(req.body);
      playlistController.addSongToPlaylist(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/playlists/:id/songs',
    authenticate,
    playlistController.getSongsFromPlaylist.bind(playlistController)
  );

  router.delete('/playlists/:id/songs', authenticate, (req, res, next) => {
    try {
      PlaylistValidator.validatePlaylistSongPayload(req.body);
      playlistController.deleteSongFromPlaylist(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/playlists/:id/activities',
    authenticate,
    playlistController.getPlaylistActivities.bind(playlistController)
  );

  return router;
};

module.exports = createPlaylistRoutes;