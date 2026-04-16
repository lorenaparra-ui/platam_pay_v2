import type { RequestContext } from '@modules/auth/application/request-context.interface';
import type { UserVisibilityScope } from '@modules/users/domain/models/user.models';

declare global {
  namespace Express {
    interface User extends RequestContext {}

    interface Request {
      /** Poblado por `ScopeGuard` tras JWT + roles. */
      user_visibility_scope?: UserVisibilityScope;
    }
  }
}

export {};