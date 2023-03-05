import { Router } from 'express'
import { usersRoutes } from './users.routes'
import { sessionsRoutes } from './sessions.routes'
import { locationsRoutes } from './locations.routes'
import { apartmentsRoutes } from './apartments.routes'
import { buildingsRoutes } from './buildings.routes'

const routes = Router()

routes.use('/sessions', sessionsRoutes)
routes.use('/users', usersRoutes)
routes.use('/locations', locationsRoutes)
routes.use('/apartments', apartmentsRoutes)
routes.use('/buildings', buildingsRoutes)


export { routes }