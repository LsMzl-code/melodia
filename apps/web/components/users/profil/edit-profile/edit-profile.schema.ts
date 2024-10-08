import { z } from "zod";


export const EditProfileSchema = z.object({
  username: z.string().min(3, { message: "Le nom d'utilisateur doit contenir 3 caractères minimum" }).trim(),
  email: z.string().email("Adresse mail non valide").trim(),
  instrument: z.string().optional(),
  // bio: z.string().max(160, "Bio trop longue"),
  // website: z.string().url("URL invalide"),
  // location: z.string().max(30, "Lieu trop long"),
})