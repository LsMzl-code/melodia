import { z } from "zod"

export const ScaleIntervalSchema = z.object({
  name: z.string(),
  details: z.string(),
})