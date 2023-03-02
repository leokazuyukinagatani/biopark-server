import { UserRepository } from '../../src/api/repositories/UserRepository'

interface  UserCreateRequest {
  name: string
  email: string
  password: string
}

interface  UserShowResponse {
  name: string
  email: string
  password: string
  id: string 
  createdAt: Date
  updatedAt: Date 
  imageId: string 
}
export class InMemoryUsersRepository implements UserRepository {
  public users : UserCreateRequest[] = [] 
  
  async create({name, email, password}: UserCreateRequest) {
    const user = {name,email,password}
    this.users.push(user)
  }

  async showByEmail(userEmail: string){
    const user = this.users.find((item) => item.email == userEmail)

    if(!user) {
      return null
    }
    return user as UserShowResponse
  }
 
}