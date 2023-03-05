import { ApartmentRepository, ApartmentRequest } from '../../repositories/ApartmentRepository'
import { AppError } from '../../utils/AppError'
import * as zod from 'zod'

export const apartmentValidate = zod.object({
  apartmentNumber: zod.number(),
  bedrooms: zod.number(),
  bathrooms: zod.number(),
  parkingSpaces: zod.number(),
  furnished: zod.boolean(),
  petsAllowed: zod.boolean(),
  size: zod.number(),
  buildingId: zod.string(),
  rentValue: zod.number(),
  ownerId: zod.string()
})

class ApartmentCreateService{
  repository: ApartmentRepository

  constructor(apartmentRepository: ApartmentRepository) {
    this.repository = apartmentRepository
  }

  async execute(data: ApartmentRequest) { 
    const apartmentValidated = apartmentValidate.parse(data)
    try {
      await this.repository.create(apartmentValidated)
    }catch(error) {
      if (error instanceof Error) {
        throw new AppError(error.message)
      } else {
        throw new AppError('Erro ao cadastrar o apartamento')
      }
    }
  }

}
export { ApartmentCreateService }
