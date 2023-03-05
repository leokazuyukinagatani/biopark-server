import { LocationRepository } from "../../repositories/LocationRepository";
import * as zod from 'zod'
import { LocationShowService } from "./LocationShowService";
import { AppError } from "../../utils/AppError";

interface LocationUpdateRequest {
  id: string
  startDate: Date
  endDate: Date
  totalValue: number
  userId: string
  apartmentId: string
}
export const locationValidate = zod.object({
  id: zod.string(),
  startDate: zod.date(),
  endDate: zod.date(),
  totalValue: zod.number(),
  userId: zod.string(),
  apartmentId: zod.string(),
})
export class LocationUpdateService{
  repository: LocationRepository
  constructor(locationRepository: LocationRepository) {
    this.repository = locationRepository
  }

  async execute(data: LocationUpdateRequest){
    const locationValidated = locationValidate.parse(data)
    try {
      const location = await new LocationShowService(this.repository).execute(data.id)
      if(!location) {
        throw new AppError('Locação não encontrada')
      }

      await this.repository.update(locationValidated)
    } catch (error) {
      throw new AppError('Erro ao atualizar a locação')
    }
  }


}