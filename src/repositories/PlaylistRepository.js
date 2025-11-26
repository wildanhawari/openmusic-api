const { nanoid } = require('nanoid');
const NotFoundError = require('../errors/NotFoundError');
const AuthorizationError = require('../errors/AuthorizationError');

class PlaylistRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async createPlaylist(id, name, owner) {
    await this.pool.query(
      'INSERT INTO playlists VALUES($1, $2, $3)',
      [id, name, owner]
    );
    return id;
  }

  async getPlaylists(owner) {
    const result = await this.pool.query(
      `SELECT p.id, p.name, u.username 
       FROM playlists p
       LEFT JOIN users u ON p.owner = u.id
       LEFT JOIN collaborations c ON c."playlistId" = p.id
       WHERE p.owner = $1 OR c."userId" = $1
       GROUP BY p.id, u.username`,
      [owner]
    );
    return result.rows;
  }

  async deletePlaylist(id) {
    const result = await this.pool.query(
      'DELETE FROM playlists WHERE id = $1 RETURNING id',
      [id]
    );

    if (!result.rowCount) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }
  }

  async verifyPlaylistOwner(playlistId, owner) {
    const result = await this.pool.query(
      'SELECT owner FROM playlists WHERE id = $1',
      [playlistId]
    );

    if (!result.rowCount) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const playlist = result.rows[0];
    if (playlist.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }

  async addSongToPlaylist(playlistId, songId) {
    const songCheck = await this.pool.query(
      'SELECT id FROM songs WHERE id = $1',
      [songId]
    );

    if (!songCheck.rowCount) {
      throw new NotFoundError('Song tidak ditemukan');
    }

    const id = `ps-${nanoid(16)}`;
    await this.pool.query(
      'INSERT INTO playlist_songs VALUES($1, $2, $3)',
      [id, playlistId, songId]
    );
  }

  async getSongsFromPlaylist(playlistId) {
    const playlistResult = await this.pool.query(
      `SELECT p.id, p.name, u.username
       FROM playlists p
       LEFT JOIN users u ON p.owner = u.id
       WHERE p.id = $1`,
      [playlistId]
    );

    if (!playlistResult.rowCount) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const songsResult = await this.pool.query(
      `SELECT s.id, s.title, s.performer
       FROM songs s
       INNER JOIN playlist_songs ps ON s.id = ps."songId"
       WHERE ps."playlistId" = $1`,
      [playlistId]
    );

    return {
      ...playlistResult.rows[0],
      songs: songsResult.rows,
    };
  }

  async deleteSongFromPlaylist(playlistId, songId) {
    const result = await this.pool.query(
      'DELETE FROM playlist_songs WHERE "playlistId" = $1 AND "songId" = $2 RETURNING id',
      [playlistId, songId]
    );

    if (!result.rowCount) {
      throw new NotFoundError('Lagu tidak ditemukan di playlist');
    }
  }
}

module.exports = PlaylistRepository;