import { z } from "zod";

/**
 * Typage des données des tonalités
 * -
 * - Correspond à getAllTonalities() => tonalities.controller.ts
 */
export const AllTonalitiesSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
}))

/**
 * Typage des données d'une tonalité
 * -
 * - Correspond à getTonalityById() => tonalities.controller.ts
 */
export const SingleTonalitySchema = z.object({
  id: z.number(),
  name: z.string(),
})