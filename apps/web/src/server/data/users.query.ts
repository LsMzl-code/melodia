"use server"
import useSessionToken from "@/hooks/use-session-token";
import { destroySession } from "@/lib/session";
import { AllUsersSchema, AuthenticatedUserSchema } from "@/src/schemas/users.schema";
import { User } from "@/src/types/users.type";
import axios from "axios";



/**
 * Récupération des données de l'utilisateur, si connecté
 * -
 * @visibility privé - jwt
 * @returns 
 */
export const getCurrentUser = async (): Promise<User | null> => {
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
    return null
  }
}

// export async function logout() {
//   destroySession()
// }


/**
 * Récupération de toutes les notes
 * @api GET http://localhost:8000/notes
 * @visibility public
 * @returns 
 */
export const getAllUsers = async (): Promise<User[] | null> => {
  try {
    const response = await axios.get('http://localhost:8000/users')

    return AllUsersSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getAllUsers]", error.message)
    return null
  }
}