import {
  BuildingRepository,
  BuildingRequest,
} from '../../repositories/BuildingRepository'

import { AppError } from '../../utils/AppError'

import * as zod from 'zod'

export const buildingValidate = zod.object({
  name: zod.string().min(5, {
    message: 'O nome deve ter no minimo 5 caracteres',
  }),
  description: zod.string().min(5, {
    message: 'A descrição deve ter no minimo 5 caracteres',
  }),
  floors: zod
    .number()
    .min(0, { message: 'O numero do andar dever ser maior ou igual a zero' }),
  amenities: zod.array(zod.string()),

  image: zod.union([zod.string(), zod.undefined()]),
  address: zod.union([
    zod.object({
      street: zod.string(),
      city: zod.string(),
      state: zod.string(),
      zip: zod.string(),
    }),
    zod.undefined(),
  ]),
})

class BuildingCreateService {
  repository: BuildingRepository

  constructor(buildingRepository: BuildingRepository) {
    this.repository = buildingRepository
  }

  async execute(data: BuildingRequest) {
    console.log(data)
    // const buildingValidated = buildingValidate.parse(data)
    try {
      const response = await this.repository.create(data)
      return response
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message)
      } else {
        throw new AppError('Erro ao cadastrar o prédio')
      }
    }
    
  }
}
export { BuildingCreateService }
