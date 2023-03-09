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
      where: { id },
      include: {
        user: true,
        apartment: true,
      },
    })
    return propositionResponse
  }

  async delete(id: string) {
    const propositionResponse = await prisma.proposition.delete({
      where: { id },
    })
    return propositionResponse
  }

  async index() {
    const propositionResponse = await prisma.proposition.findMany({
      include: {
        apartment: true,
        user: true,
      },
    })
    return propositionResponse
  }

  async indexByUser(userId: string) {
    console.log('dentro do service com filtro')
    console.log(userId)
    const propositionResponse = await prisma.proposition.findMany({
      where: { userId },
      include: {
        apartment: true,
        user: true,
      },
    })
    return propositionResponse
  }

  async patch({ id, status }) {
    console.log('dentro do proposition service')
    const propositionResponse = await prisma.proposition.update({
      where: {
        id,
      },
      data: {
        status,
      },
      include: {
        apartment: true,
        user: true
      }
    })
    console.log('passou pelo repository')
    return propositionResponse
  }
}
