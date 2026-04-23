import { JwtAuthGuard } from '@modules/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/infrastructure/guards/roles.guard';
import { ScopeGuard } from '@modules/auth/infrastructure/guards/scope.guard';

/**
 * Orden recomendado: JWT → roles → alcance jerárquico (`user_visibility_scope` en la request).
 */
export const JWT_ROLES_SCOPE_GUARDS = [
  JwtAuthGuard,
  RolesGuard,
  ScopeGuard,
] as const;
