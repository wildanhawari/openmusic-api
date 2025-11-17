const pool = require('../utils/database');
const NotFoundError = require('../errors/NotFoundError');

class SongRepository {

    async createSong(id, title, year, genre, performer, duration, albumId) {
        await pool.query('INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6, $7)', 
            [id, title, year, genre, performer, duration, albumId]);
        return id
    }

    async getSongs(filters = {}) {
        let query = 'SELECT id, title, performer FROM songs';
        const conditions = [];
        const values = [];
        let paramCount = 1;

        if (filters.title) {
            conditions.push(`title ILIKE $${paramCount}`);
            values.push(`%${filters.title}%`);
            paramCount++;
        }

        if (filters.performer) {
            conditions.push(`performer ILIKE $${paramCount}`);
            values.push(`%${filters.performer}%`);
            paramCount++;
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const result = await pool.query(query, values);
        return result.rows;
    }

    async getSongById(id) {
        const result = await pool.query('SELECT * FROM songs WHERE id = $1', [id]);
        if (!result.rowCount) throw new NotFoundError('Song tidak ditemukan');
        return result.rows[0];
    }

    async updateSong(id, title, year, genre, performer, duration, albumId) {
        const result = await pool.query(
            'UPDATE songs SET title=$1, year=$2, genre=$3, performer=$4, duration=$5, "albumId"=$6 WHERE id=$7 RETURNING id',
            [title, year, genre, performer, duration, albumId, id]
        );
        if (!result.rowCount) throw new NotFoundError('Song tidak ditemukan');
    }

    async deleteSong(id) {
        const result = await pool.query('DELETE FROM songs WHERE id=$1 RETURNING id', [id]);
        if (!result.rowCount) throw new NotFoundError('Song tidak ditemukan');
    }
}

module.exports = SongRepository;