import { response } from 'express'
import { BuildingRepository } from '../../repositories/BuildingRepository'
import { AppError } from '../../utils/AppError'

class BuildingShowService {
  repository: BuildingRepository

  constructor(buildingRepository: BuildingRepository) {
    this.repository = buildingRepository
  }
  async execute(id: string) {
    try {
      const building = await this.repository.showById(id)
      return building
    } catch (error) {
      throw new AppError('Erro ao buscar o prédio')
    }
  }
}

export { BuildingShowService }
