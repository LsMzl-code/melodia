import { z } from "zod";

/**
 * Typage des données des gammes
 * -
 * - Correspond à getAllScales() => scales.controller.ts
 */
export const AllScalesSchema = z.array(z.object({
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

/**
 * Typage des données d'une gamme
 * -
 * - Correspond à getScaleById() => scales.controller.ts
 */
export const SingleScaleSchema = z.object({
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
})