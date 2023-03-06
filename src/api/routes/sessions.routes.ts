import { Router } from 'express'
import { SessionsAdminController } from '../controllers/SessionsAdminController'
import { SessionsController } from '../controllers/SessionsController'

const sessionsRoutes = Router()

const sessionsController = new SessionsController()
const sessionsAdminController = new SessionsAdminController()

sessionsRoutes.post('/', sessionsController.create)
sessionsRoutes.post('/admin', sessionsAdminController.create)

export { sessionsRoutes }
