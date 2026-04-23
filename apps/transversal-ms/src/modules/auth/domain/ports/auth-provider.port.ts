import type {
  AuthLoginResult,
  AuthMfaSetupResult,
  AuthTokens,
} from '@modules/auth/domain/models/auth-session.model';

export const AUTH_PROVIDER = 'AUTH_PROVIDER';

export interface LoginWithPasswordPayload {
  email: string;
  password: string;
}

export interface VerifyTotpPayload {
  email: string;
  session: string;
  totpCode: string;
}

export interface SetupMfaPayload {
  session: string;
}

export interface VerifyMfaSetupPayload {
  email: string;
  session: string;
  totpCode: string;
}

export interface AuthProviderPort {
  loginWithPassword(payload: LoginWithPasswordPayload): Promise<AuthLoginResult>;
  verifyTotp(payload: VerifyTotpPayload): Promise<AuthTokens>;
  setupMfa(payload: SetupMfaPayload): Promise<AuthMfaSetupResult>;
  verifyMfaSetup(payload: VerifyMfaSetupPayload): Promise<AuthTokens>;
}
