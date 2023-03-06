import { LocationRepository } from '../../repositories/LocationRepository'
import { AppError } from '../../utils/AppError'

export class LocationIsAvailableService {
  repository: LocationRepository
  constructor(locationRepository: LocationRepository) {
    this.repository = locationRepository
  }
  async execute(id: string) {
    try {
      const location = await this.repository.showByApartmentId(id)
      return location
    } catch (error) {
      throw new AppError('Erro ao buscar a locação')
    }
  }
}
