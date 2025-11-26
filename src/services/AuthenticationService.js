class AuthenticationService {
  constructor(authenticationRepository, userService, tokenManager) {
    this.authenticationRepository = authenticationRepository;
    this.userService = userService;
    this.tokenManager = tokenManager;
  }

  async createAuthentication({ username, password }) {
    const userId = await this.userService.verifyUserCredential(username, password);

    const accessToken = this.tokenManager.generateAccessToken({ userId });
    const refreshToken = this.tokenManager.generateRefreshToken({ userId });

    await this.authenticationRepository.createRefreshToken(refreshToken);

    return { accessToken, refreshToken };
  }

  async refreshAuthentication(refreshToken) {
    await this.authenticationRepository.verifyRefreshToken(refreshToken);
    const { userId } = this.tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this.tokenManager.generateAccessToken({ userId });
    return accessToken;
  }

  async deleteAuthentication(refreshToken) {
    await this.authenticationRepository.verifyRefreshToken(refreshToken);
    await this.authenticationRepository.deleteRefreshToken(refreshToken);
  }
}

module.exports = AuthenticationService;