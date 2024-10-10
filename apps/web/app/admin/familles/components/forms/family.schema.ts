import {z} from 'zod'

export const FamilySchema = z.object({
  name: z.string().min(1),
})
