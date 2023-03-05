import { LocationRepository } from "../../repositories/LocationRepository"
import { AppError } from "../../utils/AppError"

class LocationDeleteService {
  repository: LocationRepository
  constructor(locationRepository: LocationRepository) {
    this.repository = locationRepository
  }

  async execute(id: string) {
    try {
      await this.repository.delete(id)
    } catch (error) {
      throw new AppError('Erro ao deletar a locação')
    }
  }
}

export { LocationDeleteService }