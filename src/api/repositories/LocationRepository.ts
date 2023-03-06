import { prisma } from '../database/prisma'

interface LocationRequest  {
  id?: string;
  startDate: Date;
  endDate: Date;
  totalValue: number;
  userId: string;
  apartmentId: string;
}

interface LocationCreateRequest  {
  startDate: Date | undefined;
  endDate: Date | undefined;
  totalValue: number;
  userId: string;
  apartmentId: string;
}


export class LocationRepository {
  async create({startDate,endDate,totalValue,userId,apartmentId}: LocationCreateRequest) {
    console.log('dentro do repository')
    console.log('dados ==>', userId, apartmentId)
    const createResponse =  await prisma.location.create({
      data: {
        startDate: undefined,
        endDate: undefined,
        totalValue: 2000,
        userId,
        apartmentId
      }
    })
    return createResponse 
  }

  async showById(id: string) {
    const locationResult = await prisma.location.findFirst({
      where: {
        id,
      },
    })
    return locationResult
  }
  async showByApartmentId(apartmentId: string){
    const locationResult = await prisma.location.findFirst({
      where: {
        apartmentId
      },
    })
    return locationResult
  }
  async index() {
    const locations = await prisma.location.findMany({
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
    return 
  }

  async update(location : LocationRequest) {
    await prisma.apartment.update({
      where: {
        id: location.id
      },
      data: location
    })
    return 
  }
}
