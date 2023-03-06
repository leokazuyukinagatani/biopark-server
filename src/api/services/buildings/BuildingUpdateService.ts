import {
  Address,
  BuildingRepository,
} from '../../repositories/BuildingRepository'
import { buildingValidate } from './BuildingCreateService'
import { AppError } from '../../utils/AppError'
import { BuildingShowService } from './BuildingShowService'


interface BuildingUpdateRequest {
  id: string
  name: string
  description: string
  floors: number
  amenities: string[]
  image?: string
  address?: Address
}

class BuildingUpdateService {
  repository: BuildingRepository

  constructor(buildingRepository: BuildingRepository) {
    this.repository = buildingRepository
  }
  async execute(data: BuildingUpdateRequest) {
    const buildingValidated = buildingValidate.parse(data)
    try {
      const build = await new BuildingShowService(this.repository).execute(data.id)
      if (!build) {
        throw new AppError("Contrução não encontrada");
      }

      await this.repository.update(buildingValidated)
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message)
      } else {
        throw new AppError('Erro ao atualizar o prédio')
      }
    }
  }
}

export { BuildingUpdateService }
