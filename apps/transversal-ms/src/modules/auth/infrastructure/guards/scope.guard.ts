import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import type { UserRepository } from '@modules/users/domain/ports/user.ports';
import type { RequestContext } from '@modules/auth/application/request-context.interface';
import type { UserVisibilityScope } from '@modules/users/domain/models/user.models';

@Injectable()
export class ScopeGuard implements CanActivate {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      user?: RequestContext;
      user_visibility_scope?: UserVisibilityScope;
    }>();
    const user = request.user;
    if (user === undefined) {
      throw new UnauthorizedException();
    }
    const scope = await this.user_repository.resolve_visible_internal_user_ids_for_role(
      user.internalUserId,
      user.roleCode,
    );
    request.user_visibility_scope = scope;
    return true;
  }
}
