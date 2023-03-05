import { Router } from 'express'
import { BuildingsController } from '../controllers/BuildingsController'
import { ensureAuthenticaticated } from '../middlewares/ensureAuthenticated'


const buildingsRoutes = Router() 
const buildingController = new BuildingsController()

buildingsRoutes.use( ensureAuthenticaticated)
buildingsRoutes.post('/', buildingController.create)
buildingsRoutes.put('/:id', buildingController.update)
buildingsRoutes.get('/:id', buildingController.show)
buildingsRoutes.get('/', buildingController.index)
buildingsRoutes.delete('/:id', buildingController.delete)

export { buildingsRoutes }