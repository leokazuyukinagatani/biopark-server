import {
  ApartmentRepository,
  ApartmentRequest,
} from '../../repositories/ApartmentRepository'
import { AppError } from '../../utils/AppError'
import * as zod from 'zod'

export const apartmentValidate = zod.object({
  id: zod.string(),
  apartmentNumber: zod.number(),
  bedrooms: zod.number(),
  bathrooms: zod.number(),
  parkingSpaces: zod.number(),
  furnished: zod.boolean(),
  petsAllowed: zod.boolean(),
  size: zod.number(),
  buildingId: zod.string(),
  rentValue: zod.number(),
  ownerId: zod.string(),
  imageId: zod.string()
})

class ApartmentCreateService {
  repository: ApartmentRepository

  constructor(apartmentRepository: ApartmentRepository) {
    this.repository = apartmentRepository
  }

  async execute({
    apartmentNumber,
    bedrooms,
    bathrooms,
    parkingSpaces,
    furnished,
    petsAllowed,
    size,
    rentValue,
    buildingId,
    imageId
  }: ApartmentRequest) {
    console.log('dentro do apartment repository')
    console.log(
      'data= >>>>>',
      apartmentNumber,
      bedrooms,
      bathrooms,
      parkingSpaces,
      furnished,
      petsAllowed,
      size,
      rentValue,
 
      buildingId,
      imageId
    )
    // const apartmentValidated = apartmentValidate.parse(data)
    try {
      const apartmentResponse =  await this.repository.create({
        apartmentNumber: Number(apartmentNumber),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bedrooms),
        parkingSpaces: Number(bedrooms),
        furnished,
        petsAllowed,
        size: Number(bedrooms),
        rentValue: Number(bedrooms),
        buildingId,
        imageId
      })
      return apartmentResponse
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message)
      } else {
        throw new AppError('Erro ao cadastrar o apartamento')
      }
    }
  }
}
export { ApartmentCreateService }
