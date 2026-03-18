import { Inject, Injectable } from '@nestjs/common';
import { AuthTokens } from '../../domain/models/auth-session.model';
import { AUTH_PROVIDER } from '../../domain/ports/auth-provider.port';
import type { AuthProviderPort } from '../../domain/ports/auth-provider.port';

@Injectable()
export class VerifyMfaSetupUseCase {
  constructor(
    @Inject(AUTH_PROVIDER)
    private readonly authProvider: AuthProviderPort,
  ) {}

  async execute(
    email: string,
    session: string,
    totpCode: string,
  ): Promise<AuthTokens> {
    return this.authProvider.verifyMfaSetup({ email, session, totpCode });
  }
}

