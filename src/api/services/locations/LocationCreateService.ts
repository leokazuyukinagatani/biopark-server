import { LocationRepository } from '../../repositories/LocationRepository'
import { AppError } from '../../utils/AppError'
import * as zod from 'zod'

interface LocationRequest {
  startDate: Date
  endDate: Date
  totalValue: number
  userId: string
  apartmentId: string
}

export const locationValidate = zod.object({
  startDate: zod.date(),
  endDate: zod.date(),
  totalValue: zod.number(),
  userId: zod.string(),
  apartmentId: zod.string(),
})

class LocationCreateService {
  repository: LocationRepository
  constructor(locationRepository: LocationRepository) {
    this.repository = locationRepository
  }

  async execute(data: LocationRequest) {
    const locationValidated = locationValidate.parse(data)
    try {
      await this.repository.create(locationValidated)
    } catch (error) {
      throw new AppError('Erro ao cadatrar a locação')
    }
  }
}
export { LocationCreateService }
