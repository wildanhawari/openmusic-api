const pool = require('../utils/database');
const { generateSongId } = require('../utils/idGenerator');
const NotFoundError = require('../errors/NotFoundError');

class SongRepository {
    async addSong({title, year, genre, performer, duration, albumId}) {
        const id = generateSongId();
        await pool.query('INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6)', 
            [title, year, genre, performer, duration, albumId]);
        return id
    }

    async getSongs() {
        const result = await pool.query('SELECT * FROM songs');
        return result.rows;
    }

    async getSongById(id) {
        const result = await pool.query('SELECT * FROM songs WHERE id = $1', [id]);
        if (!result.rows.length) throw new NotFoundError('Song tidak ditemukan');
        return result.rows[0];
    }

    async updateSong(id, {title, year, genre, performer, duration, albumId}) {
        const result = await pool.query(
            'UPDATE songs SET title=$1, year=$2, genre=$3, performer=$4, duration=$5, albumId=$6 WHERE id=$7 RETURNING id',
            [title, year, genre, performer, duration, albumId, id]
        );
        if (!result.rows.length) throw new NotFoundError('Song tidak ditemukan');
    }

    async deleteSong(id) {
        const result = await pool.query('DELETE FROM songs WHERE id=$1', [id]);
        if (!result.rows.length) throw new NotFoundError('Song tidak ditemukan');
    }
}

module.exports = SongRepository;