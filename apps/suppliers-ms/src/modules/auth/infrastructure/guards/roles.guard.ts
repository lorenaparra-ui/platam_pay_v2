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
    this.logger.log('1.roles_canActivate_start');
    const required = this.reflector.getAllAndOverride<Roles[] | undefined>(
      REQUIRE_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (required === undefined || required.length === 0) {
      this.logger.log('1.roles_skip_no_metadata');
      return true;
    }

    this.logger.log(`1.roles_required roles=${required.join(',')}`);
    const request = context.switchToHttp().getRequest<{ user?: RequestContext }>();
    const user = request.user;
    if (user === undefined) {
      this.logger.log('1.roles_fail_user_missing_on_request');
      throw new UnauthorizedException();
    }
    if (!required.includes(user.roleCode)) {
      this.logger.log(
        `1.roles_fail_forbidden roleCode=${user.roleCode} required=${required.join(',')}`,
      );
      throw new ForbiddenException();
    }
    this.logger.log(`1.roles_ok roleCode=${user.roleCode}`);
    return true;
  }
}
