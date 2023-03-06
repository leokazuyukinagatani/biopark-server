import { Request, Response } from 'express'
import { CustomRequest } from '../middlewares/ensureAuthenticated'
import { ApartmentRepository } from '../repositories/ApartmentRepository'
import {
  ApartmentCreateService,
  ApartmentDeleteService,
  ApartmentIndexService,
  ApartmentShowService,
  ApartmentUpdateService,
} from '../services/apartments'

import { AppError } from '../utils/AppError'

export class ApartmentsController {
  

  async create(request: CustomRequest, response: Response) {
    const {
      apartmentNumber,
      bedrooms,
      bathrooms,
      parkingSpaces,
      furnished,
      petsAllowed,
      size,
      rentValue,
      imageId
    } = request.body

    console.log('dentro do apartment controller')

    const { user } = request
    const { buildingId } = request.params
    const apartmentRepository = new ApartmentRepository()
    const apartmentCreateService = new ApartmentCreateService(
      apartmentRepository,
    )

    if (!user || typeof user.id != 'string') {
      return
    }

    const apartmentCreated = await apartmentCreateService.execute({
      apartmentNumber,
      bedrooms,
      bathrooms,
      parkingSpaces,
      furnished,
      petsAllowed,
      size,
      rentValue,
      buildingId,
      imageId
    })
    return response.status(201).json(apartmentCreated)
  }

  async show(request: Request, response: Response) {
    const { id } = request.params
    const apartmentRepository = new ApartmentRepository()
    const apartmentShowService = new ApartmentShowService(
      apartmentRepository,
    )
    const apartment = await apartmentShowService.execute(id)

    return response.status(200).json( apartment )
  }

  async delete(request: CustomRequest, response: Response) {
    const { id } = request.params
    const { user } = request
    const apartmentRepository = new ApartmentRepository()
    const apartmentShowService = new ApartmentShowService(
      apartmentRepository
    )
    const apartment = await apartmentShowService.execute(id)
    if (!user) {
      throw new AppError('Usuário não encontrado')
    }
    if (!apartment) {
      throw new AppError('Apartamento não encontrado')
    }
    if (apartment.ownerId !== user.id) {
      throw new AppError('Este apartamento não é seu')
    }
    const apartmentDeleteService = new ApartmentDeleteService(
      apartmentRepository,
    )
    await apartmentDeleteService.execute(id)
  }

  async update(request: CustomRequest, response: Response) {
    const {
      apartmentNumber,
      bedrooms,
      bathrooms,
      parkingSpaces,
      furnished,
      petsAllowed,
      size,
      rentValue,
      imageId
     
    } = request.body
    const { user } = request
    const { buildingId, id } = request.params
    const apartmentRepository = new ApartmentRepository()
    const apartmentShowService = new ApartmentShowService(
      apartmentRepository,
    )
    const apartment = await apartmentShowService.execute(id)
    if (!user) {
      throw new AppError('Usuário não encontrado')
    }
    if (!apartment) {
      throw new AppError('Apartamento não encontrado')
    }
    if (apartment.ownerId !== user.id) {
      throw new AppError('Este apartamento não é seu')
    }
    const apartmentUpdateService = new ApartmentUpdateService(
      apartmentRepository
    )
    const apartmentResponse = await apartmentUpdateService.execute({
      id,
      apartmentNumber,
      bedrooms,
      bathrooms,
      parkingSpaces,
      furnished,
      petsAllowed,
      size,
      rentValue,
      ownerId: user.id,
      buildingId,
      imageId
      
    })
    return apartmentResponse
  }

  async index(request: Request, response: Response) {
    const { buildingId } = request.params
    const apartmentRepository = new ApartmentRepository()
    const apartmentIndexService = new ApartmentIndexService(
      apartmentRepository
    )

    const apartments = await apartmentIndexService.execute(buildingId)

    return response.status(200).json( apartments )
  }
}
