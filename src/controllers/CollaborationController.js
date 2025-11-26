class CollaborationController {
  constructor(collaborationService) {
    this.collaborationService = collaborationService;
  }

  async addCollaboration(req, res, next) {
    try {
      const { playlistId, userId } = req.body;
      const { userId: credentialId } = req.user;

      const collaborationId = await this.collaborationService.addCollaboration(
        playlistId,
        userId,
        credentialId
      );

      res.status(201).json({
        status: 'success',
        data: { collaborationId },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCollaboration(req, res, next) {
    try {
      const { playlistId, userId } = req.body;
      const { userId: credentialId } = req.user;

      await this.collaborationService.deleteCollaboration(
        playlistId,
        userId,
        credentialId
      );

      res.json({
        status: 'success',
        message: 'Kolaborasi berhasil dihapus',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CollaborationController;