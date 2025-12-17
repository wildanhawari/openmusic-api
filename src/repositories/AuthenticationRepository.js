const ValidationError = require('../errors/ValidationError');

class AuthenticationRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async createRefreshToken(token) {
    await this.pool.query('INSERT INTO authentications VALUES ($1)', [token]);
  }

  async verifyRefreshToken(token) {
    const result = await this.pool.query('SELECT token FROM authentications WHERE token = $1',
      [token]
    );

    if (!result.rowCount) {
      throw new ValidationError('Refresh token tidak valid.');
    }
  }

  async deleteRefreshToken(token) {
    const result = await this.pool.query('DELETE FROM authentications WHERE token = $1', [token]);
    if (!result.rowCount) {
      throw new ValidationError('token tidak valid');
    }
  }

}

module.exports = AuthenticationRepository;