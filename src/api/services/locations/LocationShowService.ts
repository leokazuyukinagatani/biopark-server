import { LocationRepository } from '../../repositories/LocationRepository'
import { AppError } from '../../utils/AppError'

export class LocationShowService {
  repository: LocationRepository
  constructor(locationRepository: LocationRepository) {
    this.repository = locationRepository
  }
  async execute(id: string) {
    try {
      const location = await this.repository.showById(id)
      return location
    } catch (error) {
      throw new AppError('Erro ao buscar a locação')
    }
  }
}
