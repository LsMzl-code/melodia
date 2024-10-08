import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  // Vérification des rôles de l'utilisateur
  matchRoles(roles: string[], userRoles: string) {
    return roles.some(role => userRoles === role);
  }


  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Récupération des rôles de l'utilisateur
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // Si aucun rôle n'est défini, l'utilisateur est autorisé à accéder à la ressource
    if(!roles) return true;

    // Récupération de l'utilisateur
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Vérification des rôles de l'utilisateur
    return this.matchRoles(roles, user.role)
  }
}
