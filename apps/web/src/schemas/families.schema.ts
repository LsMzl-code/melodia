import { z } from "zod";

/**
 * Typage des données des familles d'accords
 * -
 * - Correspond à getAllChordFamilies() => families.controller.ts
 */
export const AllChordFamiliesSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
}))

/**
 * Typage des données d'une famille d'accords
 * -
 * - Correspond à getChordFamilyById() => families.controller.ts
 */
export const SingleChordFamilySchema = z.object({
  id: z.number(),
  name: z.string(),
})

/**
 * Typage des données des familles de gammes
 * -
 * - Correspond à getAllScaleFamilies() => families.controller.ts
 */
export const AllScaleFamiliesSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
}))

/**
 * Typage des données d'une famille de gammes
 * -
 * - Correspond à getScaleFamilyById() => families.controller.ts
 */
export const SingleScaleFamilySchema = z.object({
  id: z.number(),
  name: z.string(),
})