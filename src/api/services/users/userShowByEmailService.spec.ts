import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'
import { UserShowByEmailService } from './UserShowByEmailService'

describe('Show user by email', () => {
  it('should be able to get user by email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const UserShowByEmailServiceService = new UserShowByEmailService(
      usersRepository,
    )

    await usersRepository.create({
      name: 'joe',
      email: 'joedoe1@gmail.com',
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

    const email = 'joedoe@gmail.com'
    const response = await UserShowByEmailServiceService.execute(email)
    

    expect(response?.email == email)
  })
})
