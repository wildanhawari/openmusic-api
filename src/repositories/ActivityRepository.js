const { nanoid } = require('nanoid');

class ActivityRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async logActivity(playlistId, songId, userId, action) {
    const id = `activity-${nanoid(16)}`;
    const time = new Date().toISOString();

    await this.pool.query(
      'INSERT INTO activities (id, "playlistId", "songId", "userId", action, time) VALUES($1, $2, $3, $4, $5, $6)',
      [id, playlistId, songId, userId, action, time]
    );
  }

  async getActivities(playlistId) {
    const result = await this.pool.query(
      `SELECT u.username, s.title, a.action, a.time
       FROM activities a
       LEFT JOIN users u ON a."userId" = u.id
       LEFT JOIN songs s ON a."songId" = s.id
       WHERE a."playlistId" = $1
       ORDER BY a.time ASC`,
      [playlistId]
    );
    return result.rows;
  }
}

module.exports = ActivityRepository;