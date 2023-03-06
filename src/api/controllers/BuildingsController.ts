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
  async create(request: Request, response: Response) {
    const { name, description, floors, amenities, imageId } = request.body

    
    const buildingRepository = new BuildingRepository()
    const buildingCreateService = new BuildingCreateService(buildingRepository)

    const building = await buildingCreateService.execute({
      name,
      description,
      floors: Number(floors),
      amenities,
      imageId,
    })

    return response.status(201).json(building)
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params
    const buildingRepository = new BuildingRepository()
    const buildingDeleteService = new BuildingDeleteService(buildingRepository)
    await buildingDeleteService.execute(id)
    return response.status(200).json({})
  }

  async show(request: Request, response: Response) {
    const { id } = request.params
    const buildingRepository = new BuildingRepository()
    const buildingShowService = new BuildingShowService(buildingRepository)
    const building = await buildingShowService.execute(id)
    console.log(building)
    return response.status(200).json(building )
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
    const buildingRepository = new BuildingRepository()
    const buildingUpdateService = new BuildingUpdateService(buildingRepository)

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
    const buildingRepository = new BuildingRepository()
    const buildingIndexService = new BuildingIndexService(buildingRepository)

    const buildings = await buildingIndexService.execute()
    console.log(buildings)
    return response.status(200).json(buildings )
  }
}
