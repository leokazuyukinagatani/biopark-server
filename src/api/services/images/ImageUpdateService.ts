import { ImageRepository } from '../../repositories/ImageRepository'
import { AppError } from '../../utils/AppError'
interface ImageUpdateRequest {
  id: string
  filename: string
  url: string
}
class ImageUpdateService {
  repository: ImageRepository
  constructor(repository: ImageRepository) {
    this.repository = repository
  }

  async execute({ id, filename, url }: ImageUpdateRequest) {
    if (!id) {
      throw new AppError('Image id is required.')
    }

    if (typeof id != 'string') {
      throw new AppError('Image id should be a string.')
    }
    if (!filename) {
      throw new AppError('Image name is required.')
    }

    if (typeof filename != 'string') {
      throw new AppError('Image name should be a string.')
    }

    if (!url) {
      throw new AppError('Image url is required.')
    }

    if (typeof url != 'string') {
      throw new AppError('Image url should be a string.')
    }

    const image = await this.repository.showById(id)

    if (!image) {
      throw new AppError('Image not found.')
    }

    const updatedImage = await this.repository.update({
      id,
      filename,
      url,
    })

    return updatedImage
  }
}

export { ImageUpdateService }
