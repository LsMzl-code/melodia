import { z } from "zod";

/**
 * Typage des données des familles d'accords
 * -
 * - Correspond à getAllChordFamilies() => families.controller.ts
 */
export const AllChordFamiliesSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  chords: z.array(z.object({
    id: z.number(),
    nameChord: z.string(),
    tonalityId: z.number(),
    modeId: z.number(),
  })),
}))

/**
 * Typage des données d'une famille d'accords
 * -
 * - Correspond à getChordFamilyById() => families.controller.ts
 */
export const SingleChordFamilySchema = z.object({
  id: z.number(),
  name: z.string(),
  chords: z.array(z.object({
    id: z.number(),
    nameChord: z.string(),
    tonalityId: z.number(),
    modeId: z.number(),
  }))
})

/**
 * Typage des données des familles de gammes
 * -
 * - Correspond à getAllScaleFamilies() => families.controller.ts
 */
export const AllScaleFamiliesSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  scales: z.array(z.object({
    id: z.number(),
    nameScale: z.string(),
    notes: z.array(z.object({
      id: z.number(),
      name: z.string(),
      reference: z.string(),
      type: z.string(),
      soundUrl: z.string(),
    })),
    intervalId: z.number(),
    tonalityId: z.number(),
    modeId: z.number(),
    scaleFamilyId: z.number(),
    degree: z.string(),
  })),
}))

/**
 * Typage des données d'une famille de gammes
 * -
 * - Correspond à getScaleFamilyById() => families.controller.ts
 */
export const SingleScaleFamilySchema = z.object({
  id: z.number(),
  name: z.string(),
  scales: z.array(z.object({
    id: z.number(),
    nameScale: z.string(),
    notes: z.array(z.object({
      id: z.number(),
      name: z.string(),
      reference: z.string(),
      type: z.string(),
      soundUrl: z.string(),
    })),
    intervalId: z.number(),
    tonalityId: z.number(),
    modeId: z.number(),
    scaleFamilyId: z.number(),
    degree: z.string(),
  })),
})