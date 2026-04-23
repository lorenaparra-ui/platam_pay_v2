import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Roles } from '@platam/shared';
import type { RequestContext } from '@modules/auth/application/request-context.interface';
import { REQUIRE_ROLES_KEY } from '@modules/auth/presentation/constants/auth-metadata.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Roles[] | undefined>(
      REQUIRE_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (required === undefined || required.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: RequestContext }>();
    const user = request.user;
    if (user === undefined) {
      throw new UnauthorizedException();
    }
    if (!required.includes(user.roleCode)) {
      this.logger.warn(`roles_forbidden roleCode=${user.roleCode} required=${required.join(',')}`);
      throw new ForbiddenException();
    }
    return true;
  }
}
