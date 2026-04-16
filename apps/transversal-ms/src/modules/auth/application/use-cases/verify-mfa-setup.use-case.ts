import { Inject, Injectable } from '@nestjs/common';
import type { AuthTokens } from '@modules/auth/domain/models/auth-session.model';
import {
  AUTH_PROVIDER,
  type AuthProviderPort,
} from '@modules/auth/domain/ports/auth-provider.port';

@Injectable()
export class VerifyMfaSetupUseCase {
  constructor(
    @Inject(AUTH_PROVIDER)
    private readonly auth_provider: AuthProviderPort,
  ) {}

  execute(email: string, session: string, totpCode: string): Promise<AuthTokens> {
    return this.auth_provider.verifyMfaSetup({ email, session, totpCode });
  }
}
