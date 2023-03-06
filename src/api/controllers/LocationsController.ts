import { Request, Response } from 'express'
import { CustomRequest } from '../middlewares/ensureAuthenticated'
import { LocationRepository } from '../repositories/LocationRepository'
import {
  LocationCreateService,
  LocationDeleteService,
  LocationIndexService,
  LocationShowService,
  LocationUpdateService,
} from '../services/locations'
import { AppError } from '../utils/AppError'

export class LocationsController {

  async create(request: CustomRequest, response: Response) {
    const { startDate, endDate, totalValue } = request.body
    const { user } = request
    const { apartmentId } = request.params
    const locationRepository = new LocationRepository()
    const locationCreateService = new LocationCreateService(
      locationRepository,
    )
    if (!user || typeof user.id !== 'string') {
      throw new AppError('Usuário não encontrado')
    }
    await locationCreateService.execute({
      startDate,
      endDate,
      totalValue,
      userId: user.id,
      apartmentId,
    })

    return response.status(201)
  }

  async show(request: Request, response: Response) {
    const { id } = request.params
    const locationRepository = new LocationRepository()
    const locationShowService = new LocationShowService(locationRepository)
    const location = await locationShowService.execute(id)
    return response.status(200).json({ location })
  }
  async delete(request: Request, response: Response) {
    const { id } = request.params
    const locationRepository = new LocationRepository()
    const locationDeleteService = new LocationDeleteService(
      locationRepository
    )
    await locationDeleteService.execute(id)
    return response.status(200).json({})
  }

  async update(request: CustomRequest, response: Response) {
    const { startDate, endDate, totalValue } = request.body
    const { user } = request
    const { id, apartmentId } = request.params
    const locationRepository = new LocationRepository()
    const locationUpdateService = new LocationUpdateService(
      locationRepository,
    )
    if (!user || typeof user.id !== 'string') {
      throw new AppError('Usuário não encontrado')
    }
    
    await locationUpdateService.execute({
      id,
      startDate,
      endDate,
      totalValue,
      userId: user.id,
      apartmentId,
    })

    return response.status(201)
  }

  async index(request: CustomRequest, response: Response) {
    const locationRepository = new LocationRepository()
    const locationIndexService = new LocationIndexService(
      locationRepository,
    )
    const { user } = request
    if (!user || typeof user.id !== 'string') {
      throw new AppError('usuário não encontrado')
    }

    const locations = locationIndexService.execute(user.id)

    return response.status(200).json({ locations })
  }
}
