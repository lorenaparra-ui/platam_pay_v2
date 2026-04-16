import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class TransversalThrottlerGuard extends ThrottlerGuard {
  protected override async shouldSkip(context: ExecutionContext): Promise<boolean> {
    if (await super.shouldSkip(context)) {
      return true;
    }
    const { req } = this.getRequestResponse(context);
    const path = String(req.originalUrl ?? req.url ?? '').split('?')[0];
    return path.startsWith('/docs');
  }
}
