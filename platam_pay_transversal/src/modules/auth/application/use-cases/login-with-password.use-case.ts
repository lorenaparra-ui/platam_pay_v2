import { Inject, Injectable } from '@nestjs/common';
import { AuthLoginResult } from '../../domain/models/auth-session.model';
import {
  AUTH_PROVIDER,
} from '../../domain/ports/auth-provider.port';
import type { AuthProviderPort } from '../../domain/ports/auth-provider.port';

@Injectable()
export class LoginWithPasswordUseCase {
  constructor(
    @Inject(AUTH_PROVIDER)
    private readonly authProvider: AuthProviderPort,
  ) {}

  async execute(email: string, password: string): Promise<AuthLoginResult> {
    return this.authProvider.loginWithPassword({ email, password });
  }
}

