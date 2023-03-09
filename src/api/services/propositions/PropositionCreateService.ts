import { PropositionRepository } from '../../repositories/PropositionRepository'

import { AppError } from '../../utils/AppError'
import * as zod from 'zod'

export const propositionValidate = zod.object({
  userId: zod.string(),
  apartmentId: zod.string(),
  rentalValue: zod.number(),
})

class PropositionCreateService {
  repository: PropositionRepository

  constructor(propositionRepository: PropositionRepository) {
    this.repository = propositionRepository
  }

  async execute({ userId, apartmentId, rentalValue }) {
    console.log('dentr do service', userId, apartmentId, rentalValue)
    try {
      const propositionResponse = await this.repository.create({
        userId,
        apartmentId,
        rentalValue: Number(rentalValue),
      })

      return propositionResponse
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message)
      } else {
        throw new AppError('Erro ao cadastrar a proposta')
      }
    }
  }
}
export { PropositionCreateService }
