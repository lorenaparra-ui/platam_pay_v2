import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { RequestContext } from '@modules/auth/application/request-context.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): RequestContext => {
    const user = ctx.switchToHttp().getRequest<{ user?: RequestContext }>().user;
    if (user === undefined) {
      throw new UnauthorizedException();
    }
    return user;
  },
);
