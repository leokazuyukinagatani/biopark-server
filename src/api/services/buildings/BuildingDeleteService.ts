import { BuildingRepository } from '../../repositories/BuildingRepository'
import { AppError } from '../../utils/AppError'

class BuildingDeleteService {
  repository: BuildingRepository

  constructor(buildingRepository: BuildingRepository) {
    this.repository = buildingRepository
  }

  async execute(id: string) {
    try {
      await this.repository.delete(id)
    } catch (error) {
      throw new AppError('Erro ao deletar o prédio')
    }
  }
}

export { BuildingDeleteService }
