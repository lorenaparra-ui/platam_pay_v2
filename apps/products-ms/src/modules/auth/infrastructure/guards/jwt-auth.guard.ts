import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log('jwt_canActivate_start');
    return super.canActivate(context);
  }

  override handleRequest<TUser>(
    err: Error | undefined,
    user: TUser | false,
    _info: unknown,
    _context: ExecutionContext,
    _status?: unknown,
  ): TUser {
    if (err) {
      this.logger.warn(`jwt_auth_failed reason=${err instanceof Error ? err.name : 'unknown'}`);
      throw err;
    }
    if (user === false || user === null || user === undefined) {
      this.logger.warn('jwt_auth_failed reason=unauthorized');
      throw new UnauthorizedException();
    }
    return user;
  }
}
