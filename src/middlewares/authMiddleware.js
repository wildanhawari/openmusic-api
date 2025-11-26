const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

const AuthMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return next(new AuthenticationError('Missing authentication'));
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    next(new AuthenticationError('Token invalid'));
  }
};

module.exports = AuthMiddleware;