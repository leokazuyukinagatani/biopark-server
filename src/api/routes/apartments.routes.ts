import { Router } from 'express'
import { ApartmentsController } from '../controllers/ApartmentsController'
import { ensureAuthenticaticated } from '../middlewares/ensureAuthenticated'

const apartmentsRoutes = Router()
const apartmentController = new ApartmentsController()

apartmentsRoutes.use(ensureAuthenticaticated)
apartmentsRoutes.post('/:buildingId', apartmentController.create)
apartmentsRoutes.put('/:buildingId/:id', apartmentController.update)
apartmentsRoutes.get('/:id', apartmentController.show)
apartmentsRoutes.get('/:id', apartmentController.index)
apartmentsRoutes.delete('/:id', apartmentController.delete)

export { apartmentsRoutes }
