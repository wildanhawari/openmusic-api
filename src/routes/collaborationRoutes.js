const express = require('express');
const authenticate = require('../middlewares/authenticate');
const CollaborationValidator = require('../validators/CollaborationValidator');

const createCollaborationRoutes = (collaborationController) => {
  const router = express.Router();

  router.post('/collaborations', authenticate, (req, res, next) => {
    try {
      CollaborationValidator.validatePayload(req.body);
      collaborationController.addCollaboration(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/collaborations', authenticate, (req, res, next) => {
    try {
      CollaborationValidator.validatePayload(req.body);
      collaborationController.deleteCollaboration(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = createCollaborationRoutes;