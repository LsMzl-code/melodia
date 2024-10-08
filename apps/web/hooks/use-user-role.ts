import { verifySession } from "@/lib/session"


/**
 * Récupération du rôle de l'utilisateur connecté depuis la session.
 * -
 * - Non utilisable dans les composants client
 * @returns Le rôle de l'utilisateur connecté
 */
const useUserRole = async () => {
  const session = await verifySession()
  return session.userRole
}

export default useUserRole 