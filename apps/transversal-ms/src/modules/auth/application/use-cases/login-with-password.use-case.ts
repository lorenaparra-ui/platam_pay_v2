import { Inject, Injectable } from '@nestjs/common';
import type { AuthLoginResult } from '@modules/auth/domain/models/auth-session.model';
import {
  AUTH_PROVIDER,
  type AuthProviderPort,
} from '@modules/auth/domain/ports/auth-provider.port';

@Injectable()
export class LoginWithPasswordUseCase {
  constructor(
    @Inject(AUTH_PROVIDER)
    private readonly auth_provider: AuthProviderPort,
  ) {}

  execute(email: string, password: string): Promise<AuthLoginResult> {
    return this.auth_provider.loginWithPassword({ email, password });
  }
}
