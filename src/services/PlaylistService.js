class PlaylistService {
  constructor(playlistRepository, idGenerator) {
    this.playlistRepository = playlistRepository;
    this.idGenerator = idGenerator;
  }

  async createPlaylist(name, owner) {
    const playlistId = this.idGenerator.generatePlaylistId();
    await this.playlistRepository.createPlaylist(playlistId, name, owner);
    return playlistId;
  }

  async getPlaylists(owner) {
    return this.playlistRepository.getPlaylists(owner);
  }

  async deletePlaylist(playlistId, owner) {
    await this.playlistRepository.verifyPlaylistOwner(playlistId, owner);
    await this.playlistRepository.deletePlaylist(playlistId);
  }

  async addSongToPlaylist(playlistId, songId, owner) {
    await this.playlistRepository.verifyPlaylistOwner(playlistId, owner);
    await this.playlistRepository.addSongToPlaylist(playlistId, songId);
  }

  async getSongsFromPlaylist(playlistId, owner) {
    await this.playlistRepository.verifyPlaylistOwner(playlistId, owner);
    return this.playlistRepository.getSongsFromPlaylist(playlistId);
  }

  async deleteSongFromPlaylist(playlistId, songId, owner) {
    await this.playlistRepository.verifyPlaylistOwner(playlistId, owner);
    await this.playlistRepository.deleteSongFromPlaylist(playlistId, songId);
  }
}

module.exports = PlaylistService;