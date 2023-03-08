import { prisma } from '../database/prisma'
import { StatusProposition } from '@prisma/client'

interface PropositionCreateRequest {
  userId: string
  apartmentId: string
  rentalValue: number
}

interface PropositionUpdateRequest {
  id: string
  status: StatusProposition
  rentalValue: number
}

export class PropositionRepository {
  async create({ userId, apartmentId, rentalValue }: PropositionCreateRequest) {
    const propositionResponse = await prisma.proposition.create({
      data: {
        userId,
        apartmentId,
        rentalValue,
      },
    })
    return propositionResponse
  }

  async update({ id, rentalValue, status }: PropositionUpdateRequest) {
    const propositionResponse = await prisma.proposition.update({
      where: {
        id,
      },
      data: {
        status,
        rentalValue,
      },
    })
    return propositionResponse
  }
  async showById(id: string) {
    const propositionResponse = await prisma.proposition.findFirst({
      where: { id }
    })
    return propositionResponse
  }

  async delete(id: string) {
    const propositionResponse = await prisma.proposition.delete({
      where: { id },
    })
    return propositionResponse
  }

  async index(userId: string) {
    const propositionResponse = await prisma.proposition.findMany({
      where: { userId },
    })
    return propositionResponse
  }
}
