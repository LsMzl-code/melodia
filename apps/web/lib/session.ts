"use server"
import 'server-only'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'


const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)


/**
 * Cookie de la session.
 */
const sessionCookie = {
  name: 'melodia_session',
  options: { httpOnly: true, secure: true, path: '/' },
  duration: 7 * 24 * 60 * 60 * 1000
}


/**
 * Cryptage des données de la session
 * -
 * @param payload - The payload to encrypt
 * @returns - The encrypted session
 */
export async function encrypt(payload: { userId: string, token: string, expires: Date, role: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

/**
 * Décryptage des données de la session
 * -
 * @param session - La session à décrypter
 * @returns - Les données décryptées
 */
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    return null
  }
}



/**
 * Création d'une session utilisateur.
 * -
 * - Création de la session et redirection vers la page d'accueil
 * @param userId - L'id de l'utilisateur
 * @param token - Token JWT
 * @returns - La session créée
 */
export async function createSession(userId: string, token: string, role: string) {
  const expires = new Date(Date.now() + sessionCookie.duration)
  const session = await encrypt({ userId, token, expires, role })

  cookies().set(sessionCookie.name, session, { ...sessionCookie.options, expires })
  redirect('/')
}

/**
 * Vérification de la session utilisateur.
 * -
 * @returns - La session
 */
export async function verifySession() {
  const cookie: any = cookies().get(sessionCookie?.name)?.value
  const session = await decrypt(cookie)
  // if (!session?.userId) {
  //   redirect('/auth/connexion')
  // }

  return { userId: session?.userId, userToken: session?.token, userRole: session?.role }
}

/**
 * Mise à jour d'une session utilisateur.
 * -
 * @returns - La session mise à jour
 */
// export async function updateSession(request: NextRequest) {
//   const session = request.cookies.get('session')?.value
//   const payload = await decrypt(session)

//   if (!session || !payload) return


//   // Mise à jour de la session pour ne pas qu'elle expire
//   const parsed = await decrypt(session);
//   parsed!.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//   const res = NextResponse.next();
//   res.cookies.set('session', await encrypt(parsed), {
//     name: 'session',
//     httpOnly: true,
//     expires: parsed?.exp,
//   })
//   return res
// }

/**
 * Suppression d'une session utilisateur.
 * -
 */
export async function destroySession() {
  cookies().delete(sessionCookie.name)
  redirect('/auth/connexion');
}

