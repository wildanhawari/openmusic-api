class PlaylistController {
  constructor(playlistService) {
    this.playlistService = playlistService;
  }

  async createPlaylist(req, res, next) {
    try {
      const { userId } = req.user;
      const playlistId = await this.playlistService.createPlaylist(
        req.body.name,
        userId
      );

      res.status(201).json({
        status: 'success',
        data: { playlistId },
      });
    } catch (err) {
      next(err);
    }
  }

  async getPlaylists(req, res, next) {
    try {
      const { userId } = req.user;
      const playlists = await this.playlistService.getPlaylists(userId);

      res.json({
        status: 'success',
        data: { playlists },
      });
    } catch (err) {
      next(err);
    }
  }

  async deletePlaylist(req, res, next) {
    try {
      const { userId } = req.user;
      await this.playlistService.deletePlaylist(req.params.id, userId);

      res.json({
        status: 'success',
        message: 'Playlist berhasil dihapus',
      });
    } catch (err) {
      next(err);
    }
  }

  async addSongToPlaylist(req, res, next) {
    try {
      const { userId } = req.user;
      await this.playlistService.addSongToPlaylist(
        req.params.id,
        req.body.songId,
        userId
      );

      res.status(201).json({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
      });
    } catch (err) {
      next(err);
    }
  }

  async getSongsFromPlaylist(req, res, next) {
    try {
      const { userId } = req.user;
      const playlist = await this.playlistService.getSongsFromPlaylist(
        req.params.id,
        userId
      );

      res.json({
        status: 'success',
        data: { playlist },
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteSongFromPlaylist(req, res, next) {
    try {
      const { userId } = req.user;
      await this.playlistService.deleteSongFromPlaylist(
        req.params.id,
        req.body.songId,
        userId
      );

      res.json({
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist',
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PlaylistController;