import { prisma } from '../database/prisma'

export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
}
export interface BuildingRequest {
  id?: string
  name: string
  description: string
  floors: number
  amenities: string[]
  imageId?: string
  address?: Address
}


export class BuildingRepository {
  async create({
    name,
    description,
    floors,
    amenities,
    imageId,
   
  }: BuildingRequest) {
   
    const createdBuilding = await prisma.building.create({
      data: {
        name,
        description,
        floors,
        amenities,
        imageId,
      },
    })
    return { id: createdBuilding.id }
  }

  async showById(id: string) {
    const buildingResult = await prisma.building.findFirst({
      where: {
        id,
      },

      include: {
        image: true
      }
    })
    return buildingResult
  }

  async index() {
    const buildings = await prisma.building.findMany({
      orderBy: { name: 'asc' },
      include: {
        address: true,
        apartment: true,
        image: true
      },
    })

    return buildings
  }

  async delete(id: string) {
    await prisma.building.delete({
      where: { id },
    })
    return 
  }

  async update({
    id,
    name,
    description,
    imageId,
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
        imageId,
       
        address: {
          update: address,
        },
      },
    })
    return 
  }
}
