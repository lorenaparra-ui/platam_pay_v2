import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log('1.jwt_canActivate_start');
    return super.canActivate(context);
  }

  override handleRequest<TUser>(
    err: Error | undefined,
    user: TUser | false,
    _info: unknown,
    _context: ExecutionContext,
    _status?: unknown,
  ): TUser {
    const paso = 'jwt_handleRequest_start';
    this.logger.log(`1.${paso}`);
    if (err) {
      const name = err instanceof Error ? err.name : 'unknown_error';
      this.logger.log(`1.jwt_handleRequest_error name=${name}`);
      this.logger.warn(`jwt_auth_failed reason=${name}`);
      throw err;
    }
    if (user === false || user === null || user === undefined) {
      this.logger.log('1.jwt_handleRequest_no_user');
      this.logger.warn('jwt_auth_failed reason=unauthorized');
      throw new UnauthorizedException();
    }
    this.logger.log('1.jwt_handleRequest_success');
    return user;
  }
}
