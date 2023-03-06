import { prisma } from '../database/prisma'
import { ApartmentUpdateRequest } from '../services/apartments/ApartmentUpdateService'

export interface ApartmentRequest {
  id?: string
  apartmentNumber: number
  bedrooms: number
  bathrooms: number
  parkingSpaces: number
  furnished: boolean
  petsAllowed: boolean
  size: number
  rentValue: number
  buildingId: string
  imageId: string
}

export class ApartmentRepository {
  async create({
    apartmentNumber,
    bedrooms,
    bathrooms,
    parkingSpaces,
    furnished,
    petsAllowed,
    size,
    rentValue,
    buildingId,
    imageId,
  }: ApartmentRequest) {
    console.log(
      'dentro do apartment repository',
      apartmentNumber,
      bedrooms,
      bathrooms,
      parkingSpaces,
      furnished,
      petsAllowed,
      size,
      rentValue,
      buildingId,

      imageId,
    )
    const ownerId  = 'b310a547-2fce-4394-9b24-26172d8f8f4b' //id do owner biopark
    const apartmentResponse = await prisma.apartment.create({
      data: {
        apartmentNumber,
      
        // Owner:{
        //   connect: {
        //     id:ownerId
        //   }
        // } ,
        ownerId,
        // ownerId: '9abc265f-c1a9-4916-94d1-06bddd08a847',
        bedrooms,
        bathrooms,
        parkingSpaces,
        furnished,
        petsAllowed,
        size,
        rentValue,
        buildingId,

        imageId,
      },
    })
    console.log(apartmentResponse)
    return apartmentResponse
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
        buildingId: id,
      },
      orderBy: { id: 'asc' },
      include: {
        building: true,
        location: true,
        Owner: true,
      },
    })

    return apartments
  }

  async delete(id: string) {
    await prisma.apartment.delete({
      where: { id },
    })
  }

  async update(apartment: ApartmentUpdateRequest) {
    await prisma.apartment.update({
      where: {
        id: apartment.id,
      },
      data: apartment,
    })
  }
}
