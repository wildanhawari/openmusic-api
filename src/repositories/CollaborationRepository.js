const { nanoid } = require('nanoid');
const ValidationError = require('../errors/ValidationError');

class CollaborationRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async addCollaboration(playlistId, userId) {
    const id = `collab-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, userId],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new ValidationError('Kolaborasi gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async deleteCollaboration(playlistId, userId) {
    const query = {
      text: 'DELETE FROM collaborations WHERE "playlistId" = $1 AND "userId" = $2 RETURNING id',
      values: [playlistId, userId],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new ValidationError('Kolaborasi gagal dihapus');
    }
  }

  async verifyCollaborator(playlistId, userId) {
    const query = {
      text: 'SELECT * FROM collaborations WHERE "playlistId" = $1 AND "userId" = $2',
      values: [playlistId, userId],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new ValidationError('Kolaborasi tidak verifikasi');
    }
  }
}

module.exports = CollaborationRepository;