import { prisma } from '../database/prisma'

interface UserRequest {
  id?: string
  name: string
  email: string
  password: string
}

export class UserRepository {
  async create({ name, email, password }: UserRequest) {
    await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    })

  }

  async showByEmail(email: string) {
    const userResult = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return userResult;
  }

}
