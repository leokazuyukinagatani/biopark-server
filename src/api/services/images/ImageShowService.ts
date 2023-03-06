import { ImageRepository } from '../../repositories/ImageRepository'
import { AppError } from '../../utils/AppError'

class ImageShowService {
  repository: ImageRepository

  constructor(repository: ImageRepository) {
    this.repository = repository
  }

  async execute(image_id: string) {
    if (!image_id) {
      throw new AppError('Image id is required.')
    }

    if (typeof image_id != 'string' || image_id === ' ') {
      throw new AppError('Image id should be a String.')
    }

    const image = await this.repository.showById(image_id)

    if (!image) {
      throw new AppError('Image not found')
    }

    return image
  }
}
export { ImageShowService }
