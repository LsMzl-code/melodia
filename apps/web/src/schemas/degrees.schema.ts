import { z } from "zod";

/**
 * Typage des données des degrés
 * -
 * - Correspond à getAllDegrees() => degrees.controller.ts
 */
export const AllDegreesSchema = z.array(z.object({
  id: z.number(),
  content: z.string(),
}))

/**
 * Typage des données d'un accord
 * -
 * - Correspond à getDegreeById() => degrees.controller.ts
 */
export const SingleDegreeSchema = z.object({
  id: z.number(),
  content: z.string(),
})