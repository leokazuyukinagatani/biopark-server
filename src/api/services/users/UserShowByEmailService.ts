import { UserRepository } from "../../repositories/UserRepository";

export class UserShowByEmailService {
  repository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.repository = userRepository;
  }

  async execute(email: string) {
    const userWithEmail = await this.repository.showByEmail(email);

    return userWithEmail;
  }
}
