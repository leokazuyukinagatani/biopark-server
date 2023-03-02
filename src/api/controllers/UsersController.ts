import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserCreateService } from "../services/users/UserCreateService";
import { UserShowByEmailService } from "../services/users/UserShowByEmailService";

export class UsersController {
  userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }
  
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const userCreateService = new UserCreateService(this.userRepository);

    await userCreateService.execute({
      name,
      email,
      password
    });

    return response.status(201);
  }

  async show(request: Request, response: Response) {
    const { email } = request.body;

    const userShowByEmailService = new UserShowByEmailService(this.userRepository);

    const user = await userShowByEmailService.execute(email);

    return response.status(200).json({ user });
  }
}