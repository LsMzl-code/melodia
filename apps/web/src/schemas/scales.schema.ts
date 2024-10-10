import { z } from "zod";

/**
 * Typage des données des gammes
 * -
 * - Correspond à getAllScales() => scales.controller.ts
 */
export const AllScalesSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  notes: z.string(),
  interval: z.string(),
  tonality: z.string(),
  mode: z.string(),
  family: z.string(),
  degree: z.string().nullable(),
}))

/**
 * Typage des données d'une gamme
 * -
 * - Correspond à getScaleById() => scales.controller.ts
 */
export const SingleScaleSchema = z.object({
  id: z.number(),
  name: z.string(),
  notes: z.string(),
  interval: z.string(),
  tonality: z.string(),
  mode: z.string(),
  family: z.string(),
  degree: z.string().nullable(),
})