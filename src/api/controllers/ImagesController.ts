import { Request, Response } from 'express'
import { CloudinaryStorage } from '../../providers/CloudinaryStorage'
import { DiskStorage } from '../../providers/DiskStorage'
import { ImageRepository } from '../repositories/ImageRepository'
import {
  ImageCreateService,
  ImageDeleteService,
  ImageShowService,
  ImageUpdateService,
} from '../services/images'

import { AppError } from '../utils/AppError'

export class ImagesController {
  async create(request: Request, response: Response) {
    // console.log(request, 'dentro do image controller')
    const { file  } = request
   
    if (!file) {
      return response.status(400).json('imagem não encontrada')
    }
    const diskStorage = new DiskStorage()
    const fileInDisk = await diskStorage.saveFile(file.filename,  'buildings')

    const imageRepository = new ImageRepository()
    const imageCreateService = new ImageCreateService(imageRepository)

    const image = await imageCreateService.execute(fileInDisk)

    
    if (image instanceof AppError) {
      return response.status(400).json(image.message)
    }
    console.log('resultado do service', image)
    return response.status(201).json(image)
  }

  async delete(request: Request, response: Response) {
    const { image_id } = request.body
    const imageRepository = new ImageRepository()
    const imageDeleteService = new ImageDeleteService(imageRepository)
    const imageResult = await imageDeleteService.execute(image_id)
    if (imageResult instanceof AppError) {
      return response.status(400).json(imageResult.message)
    }
    return response.status(200).json(imageResult)
  }

  async show(request: Request, response: Response) {
    const { image_id } = request.body
    const imageRepository = new ImageRepository()
    const imageShowService = new ImageShowService(imageRepository)

    const imageResult = await imageShowService.execute(image_id)

    if (imageResult instanceof AppError) {
      return response.status(400).json(imageResult.message)
    }
    return response.status(200).json(imageResult)
  }

 

  async update(request: Request, response: Response) {
    const { id, filename, url } = request.body

    const imageRepository = new ImageRepository()
    const imageUpdateService = new ImageUpdateService(imageRepository)

    const updatedImage = await imageUpdateService.execute({
      id,
      filename,
      url,
    })

    if (updatedImage instanceof AppError) {
      return response.status(400).json(updatedImage.message)
    }
    return response.status(200).json(updatedImage)
  }
}
