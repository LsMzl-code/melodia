import { z } from "zod"

export const NoteSchema = z.object({
  name: z.string(),
  type: z.string(),
  soundUrl: z.string(),
})


