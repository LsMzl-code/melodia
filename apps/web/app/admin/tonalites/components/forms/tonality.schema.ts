import { z } from "zod"

export const TonalitySchema = z.object({
  name: z.string(),
})