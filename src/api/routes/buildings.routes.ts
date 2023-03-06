import { Router } from 'express'
import { BuildingsController } from '../controllers/BuildingsController'
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const buildingsRoutes = Router() 
const buildingController = new BuildingsController()

buildingsRoutes.use( ensureAuthenticated)

buildingsRoutes.post('/' ,buildingController.create)
buildingsRoutes.put('/:id', buildingController.update)
buildingsRoutes.get('/:id', buildingController.show)
buildingsRoutes.get('/', buildingController.index)
buildingsRoutes.delete('/:id', buildingController.delete)

export { buildingsRoutes }