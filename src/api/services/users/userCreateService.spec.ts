import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'

import { UserCreateService } from './UserCreateService'

describe('Create user', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const userCreateService = new UserCreateService(usersRepository)
    const joeUser = {
      name: 'joedoe',
      email: 'joedoe@gmail.com',
      password: '123456Abc?#das',
    }
    await userCreateService.execute(joeUser)

    expect(usersRepository.users.includes(joeUser))
  }),
  it('it should not be possible to create a user with a name of less than 5 characters', async () => {
    const joeUser = {
      name: 'joe',
      email: 'joedoe@gmail.com',
      password: '123456Abc?#das',
    } 
    const usersRepository = new InMemoryUsersRepository()
    const userCreateService = new UserCreateService(usersRepository)
  
    try {
      await userCreateService.execute(joeUser)
    } catch (error) {
      expect(error).toHaveProperty('message', 'O nome deve ter no minimo 5 caracteres')
    }
  }),
  it('should not be possible to create a user with an incorrect email', async () => {
    const joeUser = {
      name: 'joedoe',
      email: 'joe@',
      password: '123456Abc?#das',
    } 
    const usersRepository = new InMemoryUsersRepository()
    const userCreateService = new UserCreateService(usersRepository)
  
    try {
      await userCreateService.execute(joeUser)
    } catch (error) {
      expect(error).toHaveProperty('message', 'O email deve ter este formato joedoe@gmail.com')
    }
  })

  it('should not be possible to create a user with a password of less than 6 digits', async () => {
    const joeUser = {
      name: 'joedoe',
      email: 'joedoe@gmail.com',
      password: '123',
    } 
    const usersRepository = new InMemoryUsersRepository()
    const userCreateService = new UserCreateService(usersRepository)
  
    try {
      await userCreateService.execute(joeUser)
    } catch (error) {
      expect(error).toHaveProperty('message', 'A senha deve ter no minimo 6 caracteres')
    }
  })
})
