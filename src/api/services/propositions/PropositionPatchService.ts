import { PropositionRepository } from '../../repositories/PropositionRepository'

import { AppError } from '../../utils/AppError'
import * as zod from 'zod'
import { StatusProposition } from '@prisma/client'

export const propositionValidate = zod.object({
  id: zod.string(),
  status: zod.nativeEnum(StatusProposition),

})

interface PropositionPatchRequest {
  id: string
  status: StatusProposition
}

class PropositionPatchService {
  repository: PropositionRepository

  constructor(propositionRepository: PropositionRepository) {
    this.repository = propositionRepository
  }

  async execute( data: PropositionPatchRequest ) {
    const { id, status }= propositionValidate.parse(data)
    console.log('dentro do proposition service')
    try {
      const proposition = await this.repository.showById(id)
      if(!proposition) {
        throw new AppError('Proposta não encontrada')
      }
      const propositionResponse  = await this.repository.patch({id, status})
      console.log('reponse do repository',propositionResponse)
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
export { PropositionPatchService }
