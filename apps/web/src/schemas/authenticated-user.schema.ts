import { z } from "zod";

/**
 * Données d'un utilisateur connecté
 * -
 * - Correspond à getAuthenticateUser() => auth.controller.ts
 */
export const AuthenticatedUserSchema = z.object({
  id: z.string(),
  email: z.string().email("Adresse mail non valide"),
  username: z.string(),
  currentAvatar: z.string().nullable(),
  instrument: z.string().nullable(),
})