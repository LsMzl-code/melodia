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
  currentAvatar: z.string(),
  instrument: z.string().nullable(),
  avatar: z.array(z.object({
    imgUrl: z.string(),
    name: z.string(),
    createdAt: z.string(),
  }))
})

/**
 * Données de tous les utilisateurs
 * -
 * - Correspond à getAllUsers() => users.controller.ts
 */
export const AllUsersSchema = z.array(z.object({
  id: z.string(),
  email: z.string().email("Adresse mail non valide"),
  username: z.string(),
  currentAvatar: z.string(),
  instrument: z.string().nullable(),
  avatar: z.array(z.object({
    imgUrl: z.string(),
    name: z.string(),
    createdAt: z.string(),
  }))
}))