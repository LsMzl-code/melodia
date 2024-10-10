import { z } from "zod";

/**
 * Typage des données des accords
 * -
 * - Correspond à getAllChords() => chords.controller.ts
 */
export const AllChordsSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  notes: z.string(),
  interval: z.string(),
  tonality: z.string(),
  mode: z.string(),
  family: z.string(),
}))

/**
 * Typage des données d'un accord
 * -
 * - Correspond à getChordById() => chords.controller.ts
 */
export const SingleChordSchema = z.object({
  id: z.number(),
  name: z.string(),
  notes: z.string(),
  interval: z.string(),
  tonality: z.string(),
  mode: z.string(),
  family: z.string(),
})