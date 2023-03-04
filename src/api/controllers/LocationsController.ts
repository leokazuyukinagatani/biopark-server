import { Request, Response } from 'express'
import { BuildingRepository } from '../repositories/BuildingRepository'
import { BuildingCreateService } from '../services/buildings/BuildingCreateService'
// import { BuildingShowByIdService } from "../services/buildings/BuildingShowByIdService";

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

  async show(request: Request, response: Response) {}

  async update(request: Request, response: Response) {}

  async index(request: Request, response: Response) {}
}
