import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().email("Adresse mail non valide"),
  password: z.string().min(8, {message: "Le mot de passe doit contenir 8 caractères minimum"}),
})