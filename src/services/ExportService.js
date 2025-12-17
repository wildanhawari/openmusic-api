class ExportService {
  constructor(producerService, playlistService) {
    this.producerService = producerService;
    this.playlistService = playlistService;
  }

  async exportPlaylist(userId, playlistId, targetEmail) {
    await this.playlistService.verifyPlaylistOwner(playlistId, userId);

    const message = {
      playlistId,
      targetEmail,
    };

    await this.producerService.sendMessage('export:playlists', JSON.stringify(message));
  }
}

module.exports = ExportService;