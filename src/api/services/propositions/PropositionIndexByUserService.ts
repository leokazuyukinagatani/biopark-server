import { PropositionRepository } from '../../repositories/PropositionRepository'

import { AppError } from '../../utils/AppError'
class PropositionIndexByUserService {
  repository: PropositionRepository

  constructor(propositionRepository: PropositionRepository) {
    this.repository = propositionRepository
  }
  async execute(userId: string) {
    try {
      console.log('dentro do service com filtro')
      const propositionsResponse = await this.repository.indexByUser(userId)
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
export { PropositionIndexByUserService }
