const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

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
    album.songs = songsResult.rows;

    return album;
  }

  async updateAlbum(id, name, year) {
    const result = await this.pool.query(
      'UPDATE albums SET name=$1, year=$2 WHERE id=$3 RETURNING id',
      [name, year, id]
    );
    if (!result.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }
  }

  async deleteAlbum(id) {
    const result = await this.pool.query('DELETE FROM albums WHERE id=$1', [id]);
    if (!result.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }
  }

  async updateAlbumCover(id, coverUrl) {
    const result = await this.pool.query(
      'UPDATE albums SET "coverUrl" = $1 WHERE id = $2 RETURNING id',
      [coverUrl, id]
    );

    if (!result.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }
  }

  async addLike(id, userId, albumId) {
    const albumCheck = await this.pool.query('SELECT id FROM albums WHERE id = $1', [albumId]);

    if (!albumCheck.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    const verifyLike = await this.pool.query(
      'SELECT id FROM user_album_likes WHERE "userId" = $1 AND "albumId" = $2',
      [userId, albumId]
    );

    if (verifyLike.rowCount > 0) {
      throw new ValidationError('Anda sudah menyukai album ini');
    }

    await this.pool.query(
      'INSERT INTO user_album_likes VALUES($1, $2, $3)',
      [id, userId, albumId]
    );
  }

  async deleteLike(userId, albumId) {
    const result = await this.pool.query(
      'DELETE FROM user_album_likes WHERE "userId" = $1 AND "albumId" = $2 RETURNING id',
      [userId, albumId]
    );

    if (!result.rowCount) {
      throw new ValidationError('Anda belum menyukai album ini');
    }
  }

  async getLikesCount(albumId) {
    const albumCheck = await this.pool.query('SELECT id FROM albums WHERE id = $1', [albumId]);
    if (!albumCheck.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    const result = await this.pool.query(
      'SELECT COUNT(id) FROM user_album_likes WHERE "albumId" = $1',
      [albumId]
    );

    return parseInt(result.rows[0].count, 10);
  }

  async checkLike(userId, albumId) {
    const result = await this.pool.query(
      'SELECT id FROM user_album_likes WHERE "userId" = $1 AND "albumId" = $2',
      [userId, albumId]
    );
    return result.rowCount > 0;
  }
}

module.exports = AlbumRepository;