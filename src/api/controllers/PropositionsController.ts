import { Request, Response } from 'express'
import { CustomRequest } from '../middlewares/ensureAuthenticated'
import { PropositionRepository } from '../repositories/PropositionRepository'
import {
  PropositionCreateService,
  PropositionDeleteService,
  PropositionIndexService,
  PropositionShowService,
  PropositionUpdateService,
} from '../services/propositions'


export class PropositionController {
  async create(request: CustomRequest, response: Response) {
    const { user } = request
    const { apartmentId } = request.params
    const { rentalValue } = request.body

    const propositionRepository = new PropositionRepository()
    const propositionCreateService = new PropositionCreateService(
      propositionRepository,
    )
    if (!user) {
      return response.json('Usuário não encontrado')
    }

    const propositionResponse = await propositionCreateService.execute({
      userId: user.id,
      apartmentId,
      rentalValue,
    })
    return response.status(201).json(propositionResponse)
  }
  async showById(request: CustomRequest, response: Response) {
    const { id } = request.params

    const propositionRepository = new PropositionRepository()
    const propositionShowService = new PropositionShowService(
      propositionRepository,
    )

    const propositionResponse = await propositionShowService.execute(id)

    return response.status(200).json(propositionResponse)
  }
  async delete(request: CustomRequest, response: Response) {
    const { id } = request.params

    const propositionRepository = new PropositionRepository()
    const propositionDeleteService = new PropositionDeleteService(
      propositionRepository,
    )

    const propositionResponse = await propositionDeleteService.execute(id)
    return response.json(propositionResponse)
  }
  async index(request: CustomRequest, response: Response) {
    const { user } = request
    if(!user) {
      return response.json('usuário não encontrado')
    }
    const userId = user.id
    const propositionRepository = new PropositionRepository()
    const propositionIndexService = new PropositionIndexService(
      propositionRepository,
    )

    const propositionResponse = await propositionIndexService.execute(userId as string)
    return response.json(propositionResponse)
  }

  async update(request: CustomRequest, response: Response) {
    const {rentalValue, status } = request.body
    const {id} = request.params
    const propositionRepository = new PropositionRepository()
    const propositionUpdateService = new PropositionUpdateService(
      propositionRepository,
    )
    const propositionResponse = await propositionUpdateService.execute({
      id,
      rentalValue,
      status
    })

    return response.json(propositionResponse)

  }
}
