const express = require('express');
const validate = require('../middlewares/validator');
const ExportValidator = require('../validators/ExportValidator');
const authenticate = require('../middlewares/authenticate');

const createExportRoutes = (exportController) => {
  const router = express.Router();

  router.post(
    '/export/playlists/:playlistId',
    authenticate,
    validate(ExportValidator),
    exportController.postExportPlaylist.bind(exportController)
  );

  return router;
};

module.exports = createExportRoutes;