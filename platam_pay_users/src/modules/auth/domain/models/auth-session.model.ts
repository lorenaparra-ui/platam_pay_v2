export interface AuthTokens {
  accessToken: string;
  idToken: string;
  refreshToken: string | null;
  expiresIn: number;
  tokenType: string;
}

export interface AuthMfaSetupResult {
  secretCode: string;
  session: string;
}

export type AuthLoginStatus =
  | 'MFA_REQUIRED'
  | 'MFA_SETUP_REQUIRED'
  | 'PASSWORD_CHANGE_REQUIRED'
  | 'AUTHENTICATED';

export type AuthChallengeName =
  | 'SOFTWARE_TOKEN_MFA'
  | 'MFA_SETUP'
  | 'NEW_PASSWORD_REQUIRED'
  | null;

export interface AuthLoginResult {
  status: AuthLoginStatus;
  session: string | null;
  challengeName: AuthChallengeName;
  tokens: AuthTokens | null;
}

