class CollaborationService {
  constructor(collaborationRepository, playlistService, userService) {
    this.collaborationRepository = collaborationRepository;
    this.playlistService = playlistService;
    this.userService = userService;
  }

  async addCollaboration(playlistId, userId, credentialId) {
    await this.userService.getUserById(userId);
    await this.playlistService.verifyPlaylistOwner(playlistId, credentialId);

    const collaborationId = await this.collaborationRepository.addCollaboration(playlistId, userId);
    return collaborationId;
  }

  async deleteCollaboration(playlistId, userId, credentialId) {
    await this.playlistService.verifyPlaylistOwner(playlistId, credentialId);
    await this.collaborationRepository.deleteCollaboration(playlistId, userId);
  }

  async verifyCollaborator(playlistId, userId) {
    await this.collaborationRepository.verifyCollaborator(playlistId, userId);
  }
}

module.exports = CollaborationService;