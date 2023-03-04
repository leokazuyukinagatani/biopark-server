import { BuildingRepository } from "src/api/repositories/BuildingRepository"

export class BuildingDeleteService {
  repository: BuildingRepository

  constructor(buildingRepository: BuildingRepository) {
    this.repository = buildingRepository
  }

  async execute(id: string) {
    await this.repository.delete(id)
  }
}