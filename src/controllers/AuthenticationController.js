class AuthenticationController {
  constructor(authenticationService) {
    this.authenticationService = authenticationService;
  }

  async postAuthentication(req, res, next) {
    try {
      const { accessToken, refreshToken } =
        await this.authenticationService.createAuthentication(req.body);

      res.status(201).json({
        status: 'success',
        data: { accessToken, refreshToken },
      });
    } catch (err) {
      next(err);
    }
  }

  async putAuthentication(req, res, next) {
    try {
      const accessToken = await this.authenticationService.refreshAuthentication(
        req.body.refreshToken
      );

      res.json({
        status: 'success',
        data: { accessToken },
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteAuthentication(req, res, next) {
    try {
      await this.authenticationService.deleteAuthentication(req.body.refreshToken);
      res.json({
        status: 'success',
        message: 'Refresh token berhasil dihapus',
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthenticationController;