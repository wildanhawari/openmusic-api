const NotFoundError = require('../errors/NotFoundError');

class PlaylistService {
  constructor(playlistRepository, activityRepository, idGenerator) {
    this.playlistRepository = playlistRepository;
    this.activityRepository = activityRepository;
    this.idGenerator = idGenerator;
    this.collaborationService = null;
  }

  setCollaborationService(service) {
    this.collaborationService = service;
  }

  async createPlaylist(name, owner) {
    const playlistId = this.idGenerator.generatePlaylistId();
    await this.playlistRepository.createPlaylist(playlistId, name, owner);
    return playlistId;
  }

  async getPlaylists(owner) {
    const playlists = await this.playlistRepository.getPlaylists(owner);
    return playlists;
  }

  async deletePlaylist(playlistId, owner) {
    await this.verifyPlaylistOwner(playlistId, owner);
    await this.playlistRepository.deletePlaylist(playlistId);
  }

  async addSongToPlaylist(playlistId, songId, userId) {
    await this.verifyPlaylistAccess(playlistId, userId); // Cek Akses (Owner/Collab)
    await this.playlistRepository.addSongToPlaylist(playlistId, songId);

    await this.activityRepository.logActivity(playlistId, songId, userId, 'add');
  }

  async getSongsFromPlaylist(playlistId, userId) {
    await this.verifyPlaylistAccess(playlistId, userId); // Cek Akses
    return this.playlistRepository.getSongsFromPlaylist(playlistId);
  }

  async deleteSongFromPlaylist(playlistId, songId, userId) {
    await this.verifyPlaylistAccess(playlistId, userId); // Cek Akses
    await this.playlistRepository.deleteSongFromPlaylist(playlistId, songId);

    await this.activityRepository.logActivity(playlistId, songId, userId, 'delete');
  }

  async getPlaylistActivities(playlistId, userId) {
    await this.verifyPlaylistAccess(playlistId, userId); // Cek Akses
    const activities = await this.activityRepository.getActivities(playlistId);
    return {
      playlistId,
      activities,
    };
  }

  async verifyPlaylistOwner(playlistId, owner) {
    await this.playlistRepository.verifyPlaylistOwner(playlistId, owner);
  }

  async verifyPlaylistAccess(playlistId, userId) {
    try {
      await this.verifyPlaylistOwner(playlistId, userId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      try {
        await this.collaborationService.verifyCollaborator(playlistId, userId);
      } catch {
        throw error;
      }
    }
  }
}

module.exports = PlaylistService;