class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async createUser(req, res, next) {
    try {
      const id = await this.userService.createUser(req.body);
      res.status(201).json({
        status: 'success',
        data: { userId: id },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;