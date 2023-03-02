import { UserRepository } from "../../repositories/UserRepository";

export class UserShowByEmailService {
  repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async execute(email: string) {
    const userWithEmail = await this.repository.showByEmail(email);

    return userWithEmail;
  }
}
