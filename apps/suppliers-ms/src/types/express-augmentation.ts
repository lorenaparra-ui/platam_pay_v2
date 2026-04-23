import type { RequestContext } from '@modules/auth/application/request-context.interface';

declare global {
  namespace Express {
    interface User extends RequestContext {}
  }
}

export {};
