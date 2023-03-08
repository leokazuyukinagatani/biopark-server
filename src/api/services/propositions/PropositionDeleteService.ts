import { PropositionRepository } from '../../repositories/PropositionRepository'

import { AppError } from '../../utils/AppError'

class PropositionDeleteService {
  repository: PropositionRepository

  constructor(propositionRepository: PropositionRepository) {
    this.repository = propositionRepository
  }
  async execute(id: string) {
    try {
      const propositionResponse = await this.repository.delete(id)
      return propositionResponse
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message)
      } else {
        throw new AppError('Erro ao deletar a proposta')
      }
    }
  }
}
export { PropositionDeleteService }
