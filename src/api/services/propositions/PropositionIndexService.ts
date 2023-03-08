import { PropositionRepository } from '../../repositories/PropositionRepository'

import { AppError } from '../../utils/AppError'
class PropositionIndexService {
  repository: PropositionRepository

  constructor(propositionRepository: PropositionRepository) {
    this.repository = propositionRepository
  }
  async execute(userId: string) {
    try {
      const propositionsResponse = await this.repository.index(userId)
      return propositionsResponse
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message)
      } else {
        throw new AppError('Erro ao listar as propostas')
      }
    }
  }
}
export { PropositionIndexService }
