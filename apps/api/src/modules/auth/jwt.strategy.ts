import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/types/role.type';

/**
 * Extraction du JWT token dans l'en-tête de la requête. (Bearer token)
 * -
 * - Prise en compte de l'expiration du token
 * - Validation du token
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * Validation du token => Renvoi du payload du token
   * @param userId 
   * @returns 
   */
  async validate({userId, role}: {userId: string, role: string}) {
    return { userId,  role };
  }
}