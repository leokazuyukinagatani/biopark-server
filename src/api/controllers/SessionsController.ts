import { compare } from "bcryptjs";
import { AppError } from "../utils/AppError";
import { authConfig } from "../configs/auth";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import { UserShowByEmailService } from "../services/users/UserShowByEmailService";
import { UserRepository } from "../repositories/UserRepository";

export class SessionsController {
  userRepository: UserRepository
  constructor() {
    this.userRepository = new UserRepository()
  }
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const userShowByEmailService = new UserShowByEmailService(this.userRepository);

    const user = await userShowByEmailService.execute(email);

    if (!user) {
      throw new AppError("email ou senha incorretos");
    }

    const isPassword = await compare(password, user.password);

    if (!isPassword) {
      throw new AppError("email ou senha incorretos");
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.json({ user, token });
  }
}