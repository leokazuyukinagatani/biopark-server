import { PropositionRepository } from '../../repositories/PropositionRepository'

import { AppError } from '../../utils/AppError'
import * as zod from 'zod'
import { StatusProposition } from '@prisma/client'

export const propositionValidate = zod.object({
  id: zod.string(),
  status: zod.nativeEnum(StatusProposition),
  rentalValue: zod.number()
})

interface PropositionUpdateRequest {
  id: string
  rentalValue: number
  status: StatusProposition
}

class PropositionUpdateService {
  repository: PropositionRepository

  constructor(propositionRepository: PropositionRepository) {
    this.repository = propositionRepository
  }

  async execute( data: PropositionUpdateRequest ) {
    const { id, rentalValue, status }= propositionValidate.parse(data)
    try {
      const proposition = await this.repository.showById(id)
      if(!proposition) {
        throw new AppError('Proposta não encontrada')
      }
      const propositionResponse  = await this.repository.update({id, rentalValue, status})

      return propositionResponse
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message)
      } else {
        throw new AppError('Erro ao atualizar a proposta')
      }
    }
  }
}
export { PropositionUpdateService }
