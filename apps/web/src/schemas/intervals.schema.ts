import { z } from "zod";

/**
 * Typage des données des intervalles d'accords
 * -
 * - Correspond à getAllChordIntervals() => intervals.controller.ts
 */
export const AllChordIntervalsSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  details: z.string(),
  chords: z.array(z.object({
    id: z.number(),
    nameChord: z.string(),
    tonalityId: z.number(),
    modeId: z.number(),
  })),
}))

/**
 * Typage des données d'un intervalle d'accord
 * -
 * - Correspond à getChordIntervalById() => intervals.controller.ts
 */
export const SingleChordIntervalSchema = z.object({
  id: z.number(),
  name: z.string(),
  details: z.string(),
  chords: z.array(z.object({
    id: z.number(),
    nameChord: z.string(),
    tonalityId: z.number(),
    modeId: z.number(),
  })),
})

/**
 * Typage des données des intervalles de gammes
 * -
 * - Correspond à getAllScaleIntervals() => intervals.controller.ts
 */
export const AllScaleIntervalsSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  details: z.string(),
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
  }))
}))

/**
 * Typage des données d'un intervalle de gamme
 * -
 * - Correspond à getScaleIntervalById() => intervals.controller.ts
 */
export const SingleScaleIntervalSchema = z.object({
  id: z.number(),
  name: z.string(),
  details: z.string(),
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
  }))
})