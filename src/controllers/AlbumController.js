const ValidationError = require('../errors/ValidationError');

class AlbumController {
  constructor(albumsService, storageService, uploadValidator) {
    this.albumsService = albumsService;
    this.storageService = storageService;
    this.uploadValidator = uploadValidator;
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

  async updateAlbumCover(req, res, next) {
    try {
      const { id } = req.params;
      const { file } = req;

      if (!file) {
        throw new ValidationError('File cover tidak ditemukan');
      }

      if (this.uploadsValidator) {
        this.uploadsValidator.validateImageHeaders(file.mimetype);
      }

      const coverUrl = await this.storageService.writeFile(file, { filename: file.originalname });
      await this.albumsService.updateAlbumCover(id, coverUrl);

      res.status(201).json({
        status: 'success',
        message: 'Sampul berhasil diunggah',
      });
    } catch (err) {
      next(err);
    }
  }

  async likeAlbum(req, res, next) {
    try {
      const { id: albumId } = req.params;
      const { userId } = req.user;
      await this.albumsService.likeAlbum(userId, albumId);
      res.status(201).json({ status: 'success', message: 'Anda menyukai album ini' });
    } catch (err) {
      next(err);
    }
  }

  async unlikeAlbum(req, res, next) {
    try {
      const { id: albumId } = req.params;
      const { userId } = req.user;
      await this.albumsService.unlikeAlbum(userId, albumId);
      res.status(200).json({ status: 'success', message: 'Anda batal menyukai album ini' });
    } catch (err) {
      next(err);
    }
  }

  async getAlbumLikes(req, res, next) {
    try {
      const { id: albumId } = req.params;
      const { likes, isCache } = await this.albumsService.getAlbumLikes(albumId);

      if (isCache) {
        res.setHeader('X-Data-Source', 'cache');
      }

      res.status(200).json({ status: 'success', data: { likes } });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AlbumController;