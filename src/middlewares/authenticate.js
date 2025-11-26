const AuthenticationError = require('../errors/AuthenticationError');
const tokenManager = require('../utils/tokenManager');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Token tidak ditemukan');
    }

    const token = authHeader.substring(7);
    const decoded = tokenManager.decodeAccessToken(token);

    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;