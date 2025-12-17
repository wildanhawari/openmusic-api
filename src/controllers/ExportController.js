class ExportController {
  constructor(exportService) {
    this.exportService = exportService;
  }

  async postExportPlaylist(req, res, next) {
    try {
      const { playlistId } = req.params;
      const { targetEmail } = req.body;
      const { userId } = req.user;

      await this.exportService.exportPlaylist(userId, playlistId, targetEmail);

      res.status(201).json({
        status: 'success',
        message: 'Permintaan Anda sedang kami proses',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ExportController;