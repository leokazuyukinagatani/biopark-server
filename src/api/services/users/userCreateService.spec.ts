import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'
import { UserCreateService } from './UserCreateService'

describe('Create user', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const userCreateService = new UserCreateService(usersRepository)
    const joeUser = {
      name: 'joe',
      email: 'joedoe@gmail.com',
      password: '123456Abc?#das',
    }
    await userCreateService.execute(joeUser)

    expect(usersRepository.users.includes(joeUser))
  })
})
