import { Router } from 'express'
import { ImagesController } from '../controllers/ImagesController'
import * as multer from 'multer'
import { MULTER } from '../configs/upload'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
const imagesRoutes = Router()
const imagesController = new ImagesController()

const upload = multer(MULTER)

imagesRoutes.use(ensureAuthenticated)
imagesRoutes.delete('/:id', imagesController.delete)
imagesRoutes.put('/', imagesController.update)
imagesRoutes.get('/:id', imagesController.show)
imagesRoutes.post('/', upload.single('image'), imagesController.create)

export { imagesRoutes }
