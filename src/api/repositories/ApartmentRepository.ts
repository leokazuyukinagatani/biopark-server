import { prisma } from '../database/prisma'

export interface ApartmentRequest  {
  id?: string;
  apartmentNumber: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  furnished: boolean;
  petsAllowed: boolean;
  size: number;
  rentValue: number;
  buildingId: string;
  ownerId: string | null;
}


export class ApartmentRepository {
  async create(apartment: ApartmentRequest) {
    await prisma.apartment.create({
      data: apartment
    })
  }

  async showById(id: string) {
    const apartmentResult = await prisma.apartment.findFirst({
      where: {
        id,
      },
    })
    return apartmentResult
  }

  async index(id: string) {
    const apartments = await prisma.apartment.findMany({
      where: {
        buildingId: id
      },
      orderBy: { id: 'asc' },
      include: {
        building: true,
        Location: true,
        Owner: true
      },
    })

    return apartments
  }

  async delete(id: string) {
    await prisma.apartment.delete({
      where: { id },
    })
  }

  async update(apartment : ApartmentRequest) {
    await prisma.apartment.update({
      where: {
        id: apartment.id
      },
      data: apartment
    })
  }
}
