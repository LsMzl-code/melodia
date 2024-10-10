import { z } from "zod"

export const IntervalSchema = z.object({
  name: z.string(),
  details: z.string(),
})