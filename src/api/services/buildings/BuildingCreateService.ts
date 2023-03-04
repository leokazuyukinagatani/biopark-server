import { BuildingRepository } from '../../repositories/BuildingRepository'

import { AppError } from '../../utils/AppError'

import * as zod from 'zod'


interface Address {
  street: string
  city: string
  state: string
  zip: string
}

interface BuildingRequest {
  name: string
  description?: string
  floors: number
  amenities: string[]
  image?: String
  address?: Address
}

const buildingValidate = zod.object({
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
    try {
      const buildingValidated = buildingValidate.parse(data)

      await this.repository.create(buildingValidated)
    } catch (error) {
      if(error instanceof zod.ZodError) {
        const messages = error.errors.map((error) => error.message)
        throw new AppError(messages.toString())
      }else {
        throw new AppError('Erro ao cadastrar o prédio')
      }
    }
  }
}
export { BuildingCreateService }
