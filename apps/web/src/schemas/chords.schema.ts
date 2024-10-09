import { z } from "zod";

/**
 * Typage des données des accords
 * -
 * - Correspond à getAllChords() => chords.controller.ts
 */
export const AllChordsSchema = z.array(z.object({
  id: z.number(),
  nameChord: z.string(),
  tonalityId: z.number(),
  modeId: z.number(),
}))

/**
 * Typage des données d'un accord
 * -
 * - Correspond à getChordById() => chords.controller.ts
 */
export const SingleChordSchema = z.object({
  id: z.number(),
  nameChord: z.string(),
  tonalityId: z.number(),
  modeId: z.number(),
})