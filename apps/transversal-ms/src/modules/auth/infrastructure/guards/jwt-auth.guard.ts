import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {


  override handleRequest<TUser>(
    err: Error | undefined,
    user: TUser | false,
    _info: unknown,
    _context: ExecutionContext,
    _status?: unknown,
  ): TUser {
    
    if (err) {
      throw err;
    }
    if (user === false || user === null || user === undefined) {
      throw new UnauthorizedException();
    }
    return user;
  }
}