import { z } from "zod";

/**
 * Typage des données des notes
 * -
 * - Correspond à getAllNotes() => notes.controller.ts
 */
export const AllNotesSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  reference: z.string(),
  type: z.string(),
  soundUrl: z.string(),
}))

/**
 * Typage des données d'une note
 * -
 * - Correspond à getNoteById() => notes.controller.ts
 */
export const SingleNoteSchema = z.object({
  id: z.number(),
  name: z.string(),
  reference: z.string(),
  type: z.string(),
  soundUrl: z.string(),
})