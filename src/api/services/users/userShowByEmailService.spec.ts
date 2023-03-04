import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'
import { UserShowByEmailService } from './UserShowByEmailService'

describe('userShowByEmailService should be able to get user by email', () => {
  let userShowByEmailService:UserShowByEmailService
  beforeAll(async () => {
    const usersRepository = new InMemoryUsersRepository()
    userShowByEmailService = new UserShowByEmailService(
      usersRepository
    )
    await usersRepository.create({
      name: 'joe',
      email: 'joedoe@gmail.com',
      password: '123456Abc?#das',
    })

    await usersRepository.create({
      name: 'maria',
      email: 'maria@gmail.com',
      password: '123456Abc?#das',
    })

    await usersRepository.create({
      name: 'pedro',
      email: 'pedro@gmail.com',
      password: '123456Abc?#das',
    })
  })
  test("should be able to get user by email", async() => {
   
    const email = 'joedoe@gmail.com'
    const response = await userShowByEmailService.execute(email)
    expect(response).toHaveProperty('email', 'joedoe@gmail.com')
  })
  test("should not be possible to find a user who does not have the email informed", async() => {
   
    const email = 'joedoe1212@gmail.com'
    const response = await userShowByEmailService.execute(email)
    expect(response).toBeNull()
  })
})