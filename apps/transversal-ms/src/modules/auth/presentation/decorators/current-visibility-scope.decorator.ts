import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import type { RequestContext } from '@modules/auth/application/request-context.interface';
import type { UserVisibilityScope } from '@modules/users/domain/models/user.models';

type AuthedRequest = {
  user?: RequestContext;
  user_visibility_scope?: UserVisibilityScope;
};

export const CurrentVisibilityScope = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserVisibilityScope => {
    const request = ctx.switchToHttp().getRequest<AuthedRequest>();
    const scope = request.user_visibility_scope;
    if (scope === undefined) {
      throw new ForbiddenException();
    }
    return scope;
  },
);
