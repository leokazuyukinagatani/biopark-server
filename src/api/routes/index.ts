import { Router } from 'express'
import { usersRoutes } from './users.routes'
import { sessionsRoutes } from './sessions.routes'
import { locationsRoutes } from './locations.routes'
import { apartmentsRoutes } from './apartments.routes'

import { imagesRoutes } from './images.routes'
import { buildingsRoutes } from './buildings.routes'
import { propositionsRoutes } from './propositions.routes'
const routes = Router()

routes.use('/sessions', sessionsRoutes)
routes.use('/users', usersRoutes)
routes.use('/locations', locationsRoutes)
routes.use('/apartments', apartmentsRoutes)
routes.use('/buildings', buildingsRoutes)
routes.use('/images', imagesRoutes)
routes.use('/propositions', propositionsRoutes)

export { routes }
