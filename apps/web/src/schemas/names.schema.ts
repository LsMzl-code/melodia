import { z } from "zod";

/**
 * Typage des données des notes
 * -
 * - Correspond à getAllNotes() => notes.controller.ts
 */
export const AllScaleNamesSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
}))

/**
 * Typage des données d'une note
 * -
 * - Correspond à getNoteById() => notes.controller.ts
 */
export const SingleScaleNameSchema = z.object({
  id: z.number(),
  name: z.string(),
})
/**
 * Typage des données des notes
 * -
 * - Correspond à getAllNotes() => notes.controller.ts
 */
export const AllChordNamesSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
}))

/**
 * Typage des données d'une note
 * -
 * - Correspond à getNoteById() => notes.controller.ts
 */
export const SingleChordNameSchema = z.object({
  id: z.number(),
  name: z.string(),
})