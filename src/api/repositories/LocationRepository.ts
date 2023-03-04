import { prisma } from '../database/prisma'

interface LocationRequest  {
  id?: string;
  startDate: Date;
  endDate: Date;
  totalValue: number;
  userId: string;
  apartmentId: string;
}


export class LocationRepository {
  async create(location: LocationRequest) {
    await prisma.location.create({
      data: location
    })
  }

  async showById(id: string) {
    const locationResult = await prisma.location.findFirst({
      where: {
        id,
      },
    })
    return locationResult
  }

  async index(userId: string) {
    const locations = await prisma.location.findMany({
      where: {
        userId
      },
      orderBy: { startDate: 'asc' },
      include: {
        user: true,
        apartment: true,
      },
    })

    return locations
  }

  async delete(id: string) {
    await prisma.apartment.delete({
      where: { id },
    })
  }

  async update(location : LocationRequest) {
    await prisma.apartment.update({
      where: {
        id: location.id
      },
      data: location
    })
  }
}
