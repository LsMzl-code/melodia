import { z } from "zod"

export const ProgressionSchema = z.object({
  name: z.optional(z.string()),
  details: z.string(),
  family: z.string(),
})