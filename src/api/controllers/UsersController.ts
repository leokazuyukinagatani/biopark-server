import { Request, Response } from "express";
import { UserCreateService } from "../services/users/UserCreateService";
import { UserShowByEmailService } from "../services/users/UserShowByEmailService";

export class UsersController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

  
    const userCreateService = new UserCreateService();

    const id = await userCreateService.execute({
      name,
      email,
      password
    });

    return response.status(201).json({ id });
  }

  async show(request: Request, response: Response) {
    const { email } = request.body;

    const userShowByEmailService = new UserShowByEmailService();

    const user = await userShowByEmailService.execute(email);

    return response.status(200).json({ user });
  }
}