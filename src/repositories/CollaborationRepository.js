const { nanoid } = require('nanoid');
const ValidationError = require('../errors/ValidationError');

class CollaborationRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async addCollaboration(playlistId, userId) {
    const id = `collab-${nanoid(16)}`;

    const result = await this.pool.query('INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id',
      [id, playlistId, userId]
    );

    if (!result.rowCount) {
      throw new ValidationError('Kolaborasi gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async deleteCollaboration(playlistId, userId) {
    const result = await this.pool.query('DELETE FROM collaborations WHERE "playlistId" = $1 AND "userId" = $2 RETURNING id',
      [playlistId, userId]
    );

    if (!result.rowCount) {
      throw new ValidationError('Kolaborasi gagal dihapus');
    }
  }

  async verifyCollaborator(playlistId, userId) {
    const result = await this.pool.query('SELECT * FROM collaborations WHERE "playlistId" = $1 AND "userId" = $2',
      [playlistId, userId]
    );

    if (!result.rowCount) {
      throw new ValidationError('Kolaborasi tidak verifikasi');
    }
  }
}

module.exports = CollaborationRepository;