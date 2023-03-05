import { LocationRepository } from '../../repositories/LocationRepository'
import { AppError } from '../../utils/AppError'
export class LocationIndexService {
  repository: LocationRepository

  constructor(locationRepository: LocationRepository) {
    this.repository = locationRepository
  }

  async execute(id: string) {
    try {
      const locations = await this.repository.index(id)
      return locations
    } catch (error) {
      throw new AppError('Erro ao buscar as locações')
    }
  }
}
