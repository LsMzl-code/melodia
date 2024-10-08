import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


/**
 * Garde d'authentification JWT
 * -
 * - Permet d'empecher l'accès aux routes aux utilisateurs non authentifiés
 * - Utilisation de la stratégie JwtStrategy pour valider le token
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
}