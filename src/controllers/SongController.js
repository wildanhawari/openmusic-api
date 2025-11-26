class SongController {
  constructor(songService) {
    this.songService = songService;
  }

  async createSong(req, res, next) {
    try {
      const id = await this.songService.createSong(req.body);
      res.status(201).json({ status: 'success',  data: { songId: id } });
    } catch (err) {
      next(err);
    }
  }

  async getSongs(req, res, next) {
    try {
      const filters = {};
      if (req.query.title) {
        filters.title = req.query.title;
      }
      if (req.query.performer) {
        filters.performer = req.query.performer;
      }

      const songs = await this.songService.getSongs(filters);
      res.json({
        status: 'success',
        data: { songs }
      });
    } catch (err) {
      next(err);
    }
  }

  async getSongById(req, res, next) {
    try {
      const song = await this.songService.getSongById(req.params.id);
      res.json({ status: 'success', data: { song } });
    } catch (err) {
      next(err);
    }
  }

  async updateSong(req, res, next) {
    try {
      await this.songService.updateSong(req.params.id, req.body);
      res.json({ status: 'success', message: 'Song berhasil diperbarui' });
    } catch (err) {
      next(err);
    }
  }

  async deleteSong(req, res, next) {
    try {
      await this.songService.deleteSong(req.params.id);
      res.json({ status: 'success', message: 'Song berhasil dihapus' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SongController;