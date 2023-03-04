
import { BuildingRepository } from '../../src/api/repositories/BuildingRepository'
interface Address {
  street: string
  city: string
  state: string
  zip: string
}
interface BuildingCreateRequest {
  id?: string
  name: string
  description?: string
  floors: number
  amenities: string[]
  image?: String
  address?: Address
}

interface BuildingUpdateRequest {
  id?: string
  name: string
  description: string
  floors: number
  amenities: string[]
  image?: string
  address?: Address
}

interface BuildingShowResponse {
  id: string
  name: string
  description: string
  floors: number
  amenities: string[]
  image: string | null
}

export class InMemoryBuildingsRepository {
  public buildings: BuildingCreateRequest[] = []

  async create({
    name,
    description,
    floors,
    amenities,
    image,
    address,
  }: BuildingCreateRequest) {
    const building = { name, description, floors, amenities, image, address }
    this.buildings.push(building)
  }

  async showById(id: string) {
    const building = this.buildings.find((item) => item.id == id)
    if (!building) {
      return null
    }
    return building as BuildingShowResponse
  }

  // async index() {
  //   return this.buildings as (Building & {
  //     address: Address | null
  //     apartment: Apartment[])
    
  // }
  async delete(id: string): Promise<void> {
    this.buildings = this.buildings.filter((item) => item.id != id)
  }
  async update({
    id,
    name,
    description,
    image,
    floors,
    amenities,
    address,
  }: BuildingUpdateRequest): Promise<void> {
    this.buildings = this.buildings.map((item) => {
      if (item.id == id) {
        return {
          id,
          name,
          description,
          image,
          floors,
          amenities,
          address,
        }
      }
      return item
    })
    
  }
}
