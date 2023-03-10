import { PropositionRepository } from '../../repositories/PropositionRepository'

import { AppError } from '../../utils/AppError'
class PropositionIndexService {
  repository: PropositionRepository

  constructor(propositionRepository: PropositionRepository) {
    this.repository = propositionRepository
  }
  async execute() {
    try {
      const propositionsResponse = await this.repository.index()
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
