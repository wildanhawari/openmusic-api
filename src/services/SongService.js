class SongService {
  constructor(songRepository, idGenerator) {
    this.songRepository = songRepository;
    this.idGenerator = idGenerator;
  }

  async createSong({ title, year, genre, performer, duration, albumId }) {
    const songId = this.idGenerator.generateSongId();
    await this.songRepository.createSong(
      songId,
      title,
      year,
      genre,
      performer,
      duration || null,
      albumId || null
    );
    return songId;
  }

  async getSongs(filters = {}) {
    return this.songRepository.getSongs(filters);
  }

  async getSongById(id) {
    return this.songRepository.getSongById(id);
  }

  async updateSong(id, { title, year, genre, performer, duration, albumId }) {
    await this.songRepository.updateSong(
      id,
      title,
      year,
      genre,
      performer,
      duration,
      albumId
    );
  }

  async deleteSong(id) {
    await this.songRepository.deleteSong(id);
  }
}

module.exports = SongService;