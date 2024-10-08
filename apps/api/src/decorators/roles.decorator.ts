import { SetMetadata } from '@nestjs/common';

/**
 * Décorateur pour définir les rôles requis pour accéder à une ressource
 * -
 * @param args 
 * @returns 
 */
export const Roles = (...args: string[]) => SetMetadata('roles', args);

