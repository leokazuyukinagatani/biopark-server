import { Request, Response } from 'express'
import { BuildingRepository } from '../repositories/BuildingRepository'
import {
  BuildingCreateService,
  BuildingDeleteService,
  BuildingIndexService,
  BuildingShowService,
  BuildingUpdateService,
} from '../services/buildings'

export class BuildingsController {
  buildingRepository: BuildingRepository

  constructor() {
    this.buildingRepository = new BuildingRepository()
  }

  async create(request: Request, response: Response) {
    const {
      name,
      description,
      floors,
      amenities,
      image,
      address,
    } = request.body
    const buildingCreateService = new BuildingCreateService(
      this.buildingRepository,
    )

    await buildingCreateService.execute({
      name,
      description,
      floors,
      amenities,
      image,
      address,
    })

    return response.status(201)
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params
  
    const buildingDeleteService = new BuildingDeleteService(
      this.buildingRepository,
    )
    await buildingDeleteService.execute(id)
    return response.status(200).json({})
  }

  async show(request: Request, response: Response) {
    const { id } = request.params
    const buildingShowService = new BuildingShowService(this.buildingRepository)
    const building = await buildingShowService.execute(id)

    return response.status(200).json({ building })
  }

  async update(request: Request, response: Response) {
    const {
      name,
      description,
      floors,
      amenities,
      image,
      address,
    } = request.body
    const { id } = request.params
    const buildingUpdateService = new BuildingUpdateService(
      this.buildingRepository,
    )

    await buildingUpdateService.execute({
      id,
      name,
      description,
      floors,
      amenities,
      image,
      address,
    })

    return response.status(201)
  }

  async index(request: Request, response: Response) {
    const buildingIndexService = new BuildingIndexService(
      this.buildingRepository,
    )

    const buildings = buildingIndexService.execute()

    return response.status(200).json({ buildings })
  }
}
