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
import { PropositionIndexByUserService } from '../services/propositions/PropositionIndexByUserService'

import { PropositionPatchService } from '../services/propositions/PropositionPatchService'

export class PropositionsController {
  async create(request: CustomRequest, response: Response) {
    const { user } = request
    const { apartmentId } = request.params
    const { rentalValue } = request.body

    console.log('dentro do controller ', user, apartmentId, rentalValue)

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
    const propositionRepository = new PropositionRepository()
    const { user } = request
    const { byUser }= request.query

    if(byUser && user) {
      const propositionIndexByUserService = new PropositionIndexByUserService(
        propositionRepository,
      )
      const propositionResponse = await propositionIndexByUserService.execute(user.id as string)
      return response.json(propositionResponse)
    }else {
      const propositionIndexService = new PropositionIndexService(
        propositionRepository,
      )
      const propositionResponse = await propositionIndexService.execute()
      return response.json(propositionResponse)
    }
   
  }

  

  async update(request: CustomRequest, response: Response) {
    const { rentalValue, status } = request.body
    const { id } = request.params
    const propositionRepository = new PropositionRepository()
    const propositionUpdateService = new PropositionUpdateService(
      propositionRepository,
    )
    const propositionResponse = await propositionUpdateService.execute({
      id,
      rentalValue,
      status,
    })

    return response.json(propositionResponse)
  }

  async patch(request: CustomRequest, response: Response) {
    const { status } = request.body
    const { id } = request.params

    console.log('dentro do proposition Controller')
    const propositionRepository = new PropositionRepository()
    const propositionPatchService = new PropositionPatchService(
      propositionRepository
    )
    const propositionResponse = await propositionPatchService.execute({
      id,
      status,
    })
    console.log('proposition reponse =:>>>>',propositionResponse)
    return  response.json(propositionResponse)
  }
}
