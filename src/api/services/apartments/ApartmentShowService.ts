import { ApartmentRepository } from '../../repositories/ApartmentRepository'
import { AppError } from '../../utils/AppError'
import * as zod from 'zod'

class ApartmentShowService{
  repository: ApartmentRepository

  constructor(apartmentRepository: ApartmentRepository) {
    this.repository = apartmentRepository
  }
  async execute(id: string) {
    try {
      const apartment = await this.repository.showById(id)
      return apartment
    } catch (error) {
      throw new AppError('Erro ao buscar o apartamento')
    }
  }
}export {ApartmentShowService}