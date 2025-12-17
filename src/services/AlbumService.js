class AlbumService {
  constructor(albumRepository, idGenerator, cacheService) {
    this.albumRepository = albumRepository;
    this.idGenerator = idGenerator;
    this.cacheService = cacheService;
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

  async updateAlbumCover(id, coverUrl) {
    await this.albumRepository.updateAlbumCover(id, coverUrl);
  }

  async likeAlbum(userId, albumId) {
    const likeId = this.idGenerator.generateLikeId();
    await this.albumRepository.addLike(likeId, userId, albumId);
    await this.cacheService.delete(`likes:${albumId}`);
  }

  async unlikeAlbum(userId, albumId) {
    await this.albumRepository.deleteLike(userId, albumId);
    await this.cacheService.delete(`likes:${albumId}`);
  }

  async getAlbumLikes(albumId) {
    try {
      const result = await this.cacheService.get(`likes:${albumId}`);
      if (result) {
        return {
          likes: JSON.parse(result),
          isCache: true,
        };
      }
    } catch (error) {

    }

    const likes = await this.albumRepository.getLikesCount(albumId);

    await this.cacheService.set(`likes:${albumId}`, JSON.stringify(likes));

    return {
      likes,
      isCache: false,
    };
  }
}

module.exports = AlbumService;