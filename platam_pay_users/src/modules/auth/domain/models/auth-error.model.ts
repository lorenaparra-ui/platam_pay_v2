export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'ACCOUNT_LOCKED'
  | 'INVALID_TOTP'
  | 'SESSION_EXPIRED'
  | 'UNEXPECTED_AUTH_ERROR';

export class AuthDomainError extends Error {
  constructor(
    public readonly code: AuthErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'AuthDomainError';
  }
}

