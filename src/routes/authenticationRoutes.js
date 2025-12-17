const express = require('express');
const AuthenticationValidator = require('../validators/AuthenticationValidator');

const createAuthenticationRoutes = (authenticationController) => {
  const router = express.Router();

  router.post('/authentications', (req, res, next) => {
    try {
      AuthenticationValidator.validatePostPayload(req.body);
      authenticationController.postAuthentication(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  router.put('/authentications', (req, res, next) => {
    try {
      AuthenticationValidator.validatePutPayload(req.body);
      authenticationController.putAuthentication(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/authentications', (req, res, next) => {
    try {
      AuthenticationValidator.validateDeletePayload(req.body);
      authenticationController.deleteAuthentication(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = createAuthenticationRoutes;