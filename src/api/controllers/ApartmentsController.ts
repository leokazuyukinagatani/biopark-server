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
  apartmentRepository: ApartmentRepository

  constructor() {
    this.apartmentRepository = new ApartmentRepository()
  }

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
    } = request.body

    const { user } = request
    const { buildingId } = request.params
    const apartmentCreateService = new ApartmentCreateService(
      this.apartmentRepository,
    )

    if (!user || typeof user.id != 'string') {
      return
    }

    await apartmentCreateService.execute({
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
    })
  }

  async show(request: Request, response: Response) {
    const { id } = request.params
    const apartmentShowService = new ApartmentShowService(
      this.apartmentRepository,
    )
    const apartment = await apartmentShowService.execute(id)

    return response.status(200).json({ apartment })
  }

  async delete(request: CustomRequest, response: Response) {
    const { id } = request.params
    const { user } = request

    const apartmentShowService = new ApartmentShowService(
      this.apartmentRepository,
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
      this.apartmentRepository,
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
    } = request.body
    const { user } = request
    const { buildingId, id } = request.params

    const apartmentShowService = new ApartmentShowService(
      this.apartmentRepository,
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
      this.apartmentRepository
    )
    await apartmentUpdateService.execute({
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
      buildingId

    })
  }

  async index(request: Request, response: Response) {
    const { id } = request.params
    const apartmentIndexService = new ApartmentIndexService(
      this.apartmentRepository,
    )

    const apartments = apartmentIndexService.execute(id)

    return response.status(200).json({ apartments })
  }
}
