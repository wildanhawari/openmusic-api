const pool = require('../utils/database');
const { generateAlbumId } = require('../utils/idGenerator');
const NotFoundError = require('../errors/NotFoundError');

class AlbumRepository {
    async createAlbum({ name, year }) {
        const id = generateAlbumId();
        await pool.query('INSERT INTO albums VALUES($1, $2, $3)', [id, name, year]);
        return id;
    }

    async getAlbumById(id) {
        const result = await pool.query('SELECT * FROM albums WHERE id = $1', [id]);
        if (!result.rows.length) throw new NotFoundError('Album tidak ditemukan');

        const songsResult = await pool.query(
        'SELECT id, title, performer FROM songs WHERE "albumId" = $1',
        [id]
        );

        if(!songsResult.rowCount) {
            const album = albumResult.rows[0];
            album.songs = songsResult.rows;

            return album;
        }

        return result.rows[0];
    }

    async updateAlbum(id, {name, year}) {
        const result = await pool.query(
            'UPDATE albums SET name=$1, year=$2 WHERE id=$3 RETURNING id',
            [name, year, id]
        )
        if (!result.rows.length) throw new NotFoundError('Album tidak ditemukan');
    }

    async deleteAlbum(id) {
        const result = await pool.query('DELETE FROM albums WHERE id=$1', [id]);
        if (!result.rows.length) throw new NotFoundError('Album tidak ditemukan');
    }
}

module.exports = AlbumRepository;