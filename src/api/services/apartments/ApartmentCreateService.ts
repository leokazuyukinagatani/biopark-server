import * as zod from 'zod'
interface Apartment {
  apartmentNumber: number
  bedrooms: number
  bathrooms: number
  parkingSpaces: number
  furnished: boolean
  petsAllowed: boolean
  size: number
  buildingId: string
}

const apartmentValidate = zod.object({
  apartmentNumber: zod.number(),
  bedrooms: zod.number(),
  bathrooms: zod.number(),
  parkingSpaces: zod.number(),
  furnished: zod.boolean(),
  petsAllowed: zod.boolean(),
  size: zod.number(),
  buildingId: zod.string(),
})

export function ApartmentCreateService(){}
