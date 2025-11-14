class AlbumService {
  constructor(albumRepository, idGenerator) {
    this.albumRepository = albumRepository;
    this.idGenerator = idGenerator;
  }

  async addAlbum({ name, year }) {
    const albumId = this.idGenerator.generateId('album');
    await this.albumRepository.create(albumId, name, year);
    return albumId;
  }

  async getAlbumById(id) {
    return this.albumRepository.findById(id);
  }

  async updateAlbum(id, { name, year }) {
    await this.albumRepository.update(id, name, year);
  }

  async deleteAlbum(id) {
    await this.albumRepository.deleteById(id);
  }
}

module.exports = AlbumService;