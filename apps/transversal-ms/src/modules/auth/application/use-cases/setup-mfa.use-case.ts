import { Inject, Injectable } from '@nestjs/common';
import type { AuthMfaSetupResult } from '@modules/auth/domain/models/auth-session.model';
import {
  AUTH_PROVIDER,
  type AuthProviderPort,
} from '@modules/auth/domain/ports/auth-provider.port';

@Injectable()
export class SetupMfaUseCase {
  constructor(
    @Inject(AUTH_PROVIDER)
    private readonly auth_provider: AuthProviderPort,
  ) {}

  execute(session: string): Promise<AuthMfaSetupResult> {
    return this.auth_provider.setupMfa({ session });
  }
}
