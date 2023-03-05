import { ApartmentRepository } from '../../repositories/ApartmentRepository'

import { AppError } from '../../utils/AppError'

class ApartmentDeleteService {
  repository: ApartmentRepository

  constructor(apartmentRepository: ApartmentRepository) {
    this.repository = apartmentRepository
  }

  async execute(id: string) {
    try {
      await this.repository.delete(id)
    } catch (error) {
      throw new AppError('Error ao deletar o apartamento')
    }
  }
}
export { ApartmentDeleteService }
