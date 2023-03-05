import { ApartmentRepository } from '../../repositories/ApartmentRepository'
import { AppError } from '../../utils/AppError'

import { apartmentValidate } from './ApartmentCreateService'
import { ApartmentShowService } from './ApartmentShowService'

export interface ApartmentUpdateRequest {
  id: string
  apartmentNumber: number
  bedrooms: number
  bathrooms: number
  parkingSpaces: number
  furnished: boolean
  petsAllowed: boolean
  size: number
  rentValue: number
  buildingId: string
  ownerId: string | null
}

class ApartmentUpdateService {
  repository: ApartmentRepository

  constructor(apartmentRepository: ApartmentRepository) {
    this.repository = apartmentRepository
  }
  async execute(data: ApartmentUpdateRequest) {
    const apartmentValidated = apartmentValidate.parse(data)
    try {
      const apartment = await new ApartmentShowService(this.repository).execute(
        data.id,
      )
      if (!apartment) {
        throw new AppError('Apartamento não encontrado')
      }
      await this.repository.update(apartmentValidated)
    } catch (error) {
      throw new AppError('Erro ao atualizar o apartamento')
    }
  }
}
export { ApartmentUpdateService }
