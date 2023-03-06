import { prisma } from '../database/prisma'

interface UserRequest {
  id?: string
  name: string
  email: string
  password: string
}

export class UserRepository {
  async create({ name, email, password }: UserRequest) {
    const response  = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    })
    return response
  }

  async update({ id, name, email, password }: UserRequest) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
      },
    })
  }

  async showByEmail(email: string) {

    const userResult = await prisma.user.findFirst({
      where: {
        email,
      },
    })
    
    return userResult
  }
}
