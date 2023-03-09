import { Router } from 'express'
import { PropositionsController } from '../controllers/PropositionsController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const propositionsRoutes = Router()
const propositionsController = new PropositionsController()

propositionsRoutes.use(ensureAuthenticated)
propositionsRoutes.post('/:apartmentId', propositionsController.create)
propositionsRoutes.put('/:id', propositionsController.update)
propositionsRoutes.get('/:id', propositionsController.showById)
propositionsRoutes.get('/', propositionsController.index)
propositionsRoutes.delete('/:id', propositionsController.delete)
propositionsRoutes.patch('/:id', propositionsController.patch)

export { propositionsRoutes }
