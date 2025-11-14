class SongService {
  constructor(songRepository, idGenerator) {
    this.songRepository = songRepository;
    this.idGenerator = idGenerator;
  }

  async addSong({ title, year, genre, performer, duration, albumId }) {
    const songId = this.idGenerator.generateId('song');
    await this.songRepository.create(
      songId,
      title,
      year,
      genre,
      performer,
      duration,
      albumId
    );
    return songId;
  }

  async getSongs(filters) {
    return this.songRepository.findAll(filters);
  }

  async getSongById(id) {
    return this.songRepository.findById(id);
  }

  async updateSong(id, { title, year, genre, performer, duration, albumId }) {
    await this.songRepository.update(
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
    await this.songRepository.deleteById(id);
  }
}

module.exports = SongService;