import { z } from "zod"

export const ChordIntervalSchema = z.object({
  name: z.string(),
  details: z.string(),
})