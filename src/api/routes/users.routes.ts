import { Router } from 'express'
import { UsersController } from '../controllers/UsersController'
import { ensureAuthenticaticated } from '../middlewares/ensureAuthenticated'


const usersRoutes = Router() 
const usersController = new UsersController()


usersRoutes.post('/', usersController.create)
usersRoutes.get('/', ensureAuthenticaticated, usersController.show)

export { usersRoutes }