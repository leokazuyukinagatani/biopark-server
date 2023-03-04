import { UserRepository } from '../../repositories/UserRepository'
import { AppError } from '../../utils/AppError'

import { hashSync } from 'bcryptjs'
import * as zod from 'zod'


interface UserRequest {
  name: string
  email: string
  password: string
}

//const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#?])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/
const userValidate = zod.object({
  name: zod.string().min(5, {
    message: 'O nome deve ter no minimo 5 caracteres',
  }),
  email: zod.string().email({
    message: 'O email deve ter este formato joedoe@gmail.com',
  }),
  password: zod.string().min(6, {
    message: 'A senha deve ter no minimo 6 caracteres',
  }),
})

class UserCreateService {
  repository: UserRepository

  constructor(userRepository: UserRepository) {
    this.repository = userRepository
  }

  async execute({ name, email, password }: UserRequest) {
    try {
      const userValidated = userValidate.parse({ name, email, password })

      const userWithEmail = await this.repository.showByEmail(
        userValidated.email,
      )

      if (userWithEmail) {
        throw new AppError('Email já cadastrado', 403)
      }

      const hashedPassword = hashSync(userValidated.password)

      await this.repository.create({
        name,
        email,
        password: hashedPassword,
      })
    } catch (error) {
      if (error instanceof zod.ZodError) {
        const messages = error.errors.map((error) => error.message)
        throw new AppError(messages.toString())
      } else {
        throw new AppError('Erro ao cadastrar usuario')
      }
    }
  }
}

export { UserCreateService }
