const jwt = require('jsonwebtoken');
const ValidationError = require('../errors/ValidationError');

const tokenManager = {
  generateAccessToken: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: `${process.env.ACCESS_TOKEN_AGE}s`,
    });
  },

  generateRefreshToken: (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY);
  },

  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
      return artifacts;
    } catch {
      throw new ValidationError('Refresh token tidak valid');
    }
  },

  decodeAccessToken: (accessToken) => {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
      return decoded;
    } catch {
      throw new ValidationError('Access token tidak valid');
    }
  },
};

module.exports = tokenManager;