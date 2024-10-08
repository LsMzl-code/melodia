import { verifySession } from "@/lib/session"


/**
 * Récupération du token JWT de la session utilisateur.
 * -
 * @returns - Le token JWT de la session utilisateur
 */
const useSessionToken = async () => {
  const session = await verifySession()
  return session.userToken
}

export default useSessionToken 