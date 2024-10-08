import useSessionToken from "@/hooks/use-session-token";
import { AuthenticatedUserSchema } from "@/src/schemas/authenticated-user.schema";
import { destroySession } from "./session";


/**
 * Récupération des données de l'utilisateur, si connecté
 * -
 * @returns 
 */
export const getCurrentUser = async () => {
  try {
    // Récupération du token de l'utilisateur
    const userToken = await useSessionToken()
    if (!userToken) return null

    // Appel de l'API NestJS
    const response = await fetch(`http://localhost:8000/auth`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    });

    // Récupération des données de l'utilisateur
    const data = await response.json()
    // Validation des données avec Zod
    return AuthenticatedUserSchema.parse(data)
    // return data
  } catch (error) {
    console.log('error', error)
    // await logout()
  }
}

export async function logout() {
  destroySession()
}