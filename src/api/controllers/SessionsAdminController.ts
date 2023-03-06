import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { authConfig } from "../configs/auth";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import { UserShowByEmailService } from "../services/users/UserShowByEmailService";
import { UserRepository } from "../repositories/UserRepository";

export class SessionsAdminController {
 
  async create(request: Request, response: Response) {
    const { email, password } = request.body;
    const userRepository = new UserRepository()
    const userShowByEmailService = new UserShowByEmailService(userRepository);
    
    const user = await userShowByEmailService.execute(email);

    if (!user) {
      throw new AppError("email ou senha incorretos");
    }

    const isPassword = await compare(password, user.password);

    if (!isPassword) {
      throw new AppError("email ou senha incorretos");
    }

    if(user.role !== 'ADMIN'){
      throw new AppError("autorização invalida");
    }
    console.log('passou na validacao')

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.json({ user, token });
  }
}