class AlbumService {
  constructor(albumRepository, idGenerator) {
    this.albumRepository = albumRepository;
    this.idGenerator = idGenerator;
  }

  async createAlbum({ name, year }) {
    const albumId = this.idGenerator.generateAlbumId();
    await this.albumRepository.createAlbum(albumId, name, year);
    return albumId;
  }

  async getAlbumById(id) {
    return this.albumRepository.getAlbumById(id);
  }

  async updateAlbum(id, { name, year }) {
    await this.albumRepository.updateAlbum(id, name, year);
  }

  async deleteAlbum(id) {
    await this.albumRepository.deleteAlbum(id);
  }
}

module.exports = AlbumService;