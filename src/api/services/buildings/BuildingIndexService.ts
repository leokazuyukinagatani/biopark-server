import { AppError } from '../../utils/AppError'
import { BuildingRepository } from '../../repositories/BuildingRepository'

class BuildingIndexService {
  repository: BuildingRepository

  constructor(buildingRepository: BuildingRepository) {
    this.repository = buildingRepository
  }

  async execute() {
    try {
      const buildings = await this.repository.index()
      return buildings
    } catch (error) {
      throw new AppError('Erro ao buscar os prédios')
    }
  }
}

export { BuildingIndexService }
