import { z } from "zod"

export const SignUpSchema = z.object({
  email: z.string().email("Adresse mail non valide").trim(),
  username: z.string().min(3, { message: "Le nom d'utilisateur doit contenir 3 caractères minimum" }).trim(),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir 8 caractères minimum" })
    .regex(/[a-zA-Z]/, { message: "Le mot de passe doit contenir une lettre" })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir un chiffre" })
    .regex(/[^a-zA-Z0-9]/, { message: 'Le mot de passe doit contenir un caractère spécial.' })
    .trim(),
  confirmationPassword: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir 8 caractères minimum" })
    .regex(/[a-zA-Z]/, { message: "Le mot de passe doit contenir une lettre" })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir un chiffre" })
    .regex(/[^a-zA-Z0-9]/, { message: 'Le mot de passe doit contenir un caractère spécial.' })
    .trim(),
  avatar: z.string()
}).refine(
  (data) => {
    //*** VERIFICATION DE LA CONFORMITE DES MOTS DE PASSE ***//
    if (data.password !== data.confirmationPassword) {
      return false
    }
    return true
  },
  {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmationPassword"]
  }
)