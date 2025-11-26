class AlbumController {
  constructor(albumsService) {
    this.albumsService = albumsService;
  }

  async createAlbum(req, res, next) {
    try {
      const id = await this.albumsService.createAlbum(req.body);
      res.status(201).json({ status: 'success', data: { albumId: id } });
    } catch (err) {
      next(err);
    }
  }

  async getAlbumById(req, res, next) {
    try {
      const album = await this.albumsService.getAlbumById(req.params.id);
      res.json({ status: 'success', data: { album } });
    } catch (err) {
      next(err);
    }
  }

  async updateAlbum(req, res, next) {
    try {
      await this.albumsService.updateAlbum(req.params.id, req.body);
      res.json({ status: 'success', message: 'Album berhasil diperbarui' });
    } catch (err) {
      next(err);
    }
  }

  async deleteAlbum(req, res, next) {
    try {
      await this.albumsService.deleteAlbum(req.params.id);
      res.json({ status: 'success', message: 'Album berhasil dihapus' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AlbumController;