import { Inject, Injectable } from '@nestjs/common';
import { AuthMfaSetupResult } from '../../domain/models/auth-session.model';
import { AUTH_PROVIDER } from '../../domain/ports/auth-provider.port';
import type { AuthProviderPort } from '../../domain/ports/auth-provider.port';

@Injectable()
export class SetupMfaUseCase {
  constructor(
    @Inject(AUTH_PROVIDER)
    private readonly authProvider: AuthProviderPort,
  ) {}

  async execute(session: string): Promise<AuthMfaSetupResult> {
    return this.authProvider.setupMfa({ session });
  }
}

