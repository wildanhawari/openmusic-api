class UserService {
  constructor(userRepository, idGenerator) {
    this.userRepository = userRepository;
    this.idGenerator = idGenerator;
  }

  async createUser({ username, password, fullname }) {
    const userId = this.idGenerator.generateUserId();
    await this.userRepository.createUser(userId, username, password, fullname);
    return userId;
  }

  async getUserById(id) {
    return this.userRepository.getUserById(id);
  }

  async verifyUserCredential(username, password) {
    return this.userRepository.verifyUserCredential(username, password);
  }
}

module.exports = UserService;