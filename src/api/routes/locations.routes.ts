import { Router } from 'express'
import { LocationsController } from '../controllers/LocationsController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'


const locationsRoutes = Router() 
const locationsController = new LocationsController()

locationsRoutes.use( ensureAuthenticated)
locationsRoutes.post('/:apartmentId', locationsController.create)
locationsRoutes.put('/:apartmentId/:id', locationsController.update)
locationsRoutes.get('/:id', locationsController.show)
locationsRoutes.get('/', locationsController.index)
locationsRoutes.delete('/:id', locationsController.delete)

export { locationsRoutes }