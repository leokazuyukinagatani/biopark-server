import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserCreateService, UserShowByEmailService } from "../services/users";

export class UsersController {
 
  async create(request: Request, response: Response) {
    const userRepository = new UserRepository()

    const { name, email, password } = request.body;

    
    const userCreateService = new UserCreateService(userRepository);

    const userId = await userCreateService.execute({
      name,
      email,
      password
    });

    return response.status(201).json({
      userId
    });
  }

  async show(request: Request, response: Response) {
    const { email } = request.body;
    const userRepository = new UserRepository()
    const userShowByEmailService = new UserShowByEmailService(userRepository);

    const user = await userShowByEmailService.execute(email);

    return response.status(200).json({ user });
  }
}