import { ApartmentRepository } from '../../repositories/ApartmentRepository'
import { AppError } from '../../utils/AppError'


class ApartmentIndexService {
  repository: ApartmentRepository

  constructor(apartmentRepository: ApartmentRepository) {
    this.repository = apartmentRepository
  }

  async execute(id: string) {
    try {
      const apartments = await this.repository.index(id)
      return apartments
    }catch(error) {
      throw new AppError('Erro ao listar os apartamentos')
    }
  }
}
export { ApartmentIndexService }
