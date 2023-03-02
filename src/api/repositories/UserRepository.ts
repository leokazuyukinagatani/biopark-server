import { prisma } from '../database/prisma'

interface UserRequest {
  id?: string
  name: string
  email: string
  password: string
}

export class UserRepository {
  async create({ name, email, password }: UserRequest) {
    const response = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    })

    return { id: response.id }
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
