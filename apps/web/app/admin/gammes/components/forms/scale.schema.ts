import { z } from "zod"

export const ScaleSchema = z.object({
  name: z.string(),
  notes: z.array(z.string()),
  mode: z.string(),
  tonality: z.string(),
  interval: z.string(),
  scaleFamily: z.string(),
  diagram: z.optional(z.string()),
  degree: z.optional(z.string()),
})