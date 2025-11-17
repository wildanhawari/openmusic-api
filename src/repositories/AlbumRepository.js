const NotFoundError = require('../errors/NotFoundError');

class AlbumRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async createAlbum(id, name, year) {
    await this.pool.query('INSERT INTO albums VALUES($1, $2, $3)', [id, name, year]);
    return id;
  }

  async getAlbumById(id) {
    const result = await this.pool.query('SELECT * FROM albums WHERE id = $1', [id]);
    if (!result.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    const album = result.rows[0];

    const songsResult = await this.pool.query(
      'SELECT id, title, performer FROM songs WHERE "albumId" = $1',
      [id]
    );

    if (!songsResult.rowCount) {
      album.songs = songsResult.rows;
    }

    return album;
  }

  async updateAlbum(id, name, year) {
    const result = await this.pool.query(
      'UPDATE albums SET name=$1, year=$2 WHERE id=$3 RETURNING id',
      [name, year, id]
    );
    if (!result.rowCount) throw new NotFoundError('Album tidak ditemukan');
  }

  async deleteAlbum(id) {
    const result = await this.pool.query('DELETE FROM albums WHERE id=$1', [id]);
    if (!result.rowCount) throw new NotFoundError('Album tidak ditemukan');
  }
}

module.exports = AlbumRepository;