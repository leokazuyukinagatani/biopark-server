
import { prisma } from '../database/prisma'
import { Address } from '@prisma/client'

interface BuildingRequest {
  id?: string
  name: string
  description: string
  floors: number
  amenities: string[]
  image?: string
  address?: Address
 
}


export class BuildingRepository {
  async create({
    name,
    description,
    floors,
    amenities,
    image,
    address,
  }: BuildingRequest) {
    await prisma.building.create({
      data: {
        name,
        description,
        floors,
        amenities,
        image,
        address: {
          create: address,
        },
      },
    })
  }

  async showById(id: string) {
    const buildingResult = await prisma.building.findFirst({
      where: {
        id,
      },
    })
    return buildingResult
  }

  async index() {
    const buildings = await prisma.building.findMany({
      orderBy: { name: 'asc' },
      include: {
        address: true,
        apartment: true,
      },
    })

    return buildings
  }

  async delete(id: string) {
    await prisma.building.delete({
      where: { id },
    })
  }

  async update({
    id,
    name,
    description,
    image,
    floors,
    amenities,
    address,
  }: BuildingRequest) {
    await prisma.building.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        floors,
        amenities,
        image,
       
        address: {
          update: address,
        },
      },
    })
  }
}
