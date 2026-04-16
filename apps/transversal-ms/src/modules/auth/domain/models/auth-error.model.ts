export type AuthDomainErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'ACCOUNT_LOCKED'
  | 'INVALID_TOTP'
  | 'SESSION_EXPIRED'
  | 'UNEXPECTED_AUTH_ERROR';

export class AuthDomainError extends Error {
  readonly code: AuthDomainErrorCode;

  constructor(code: AuthDomainErrorCode, message: string) {
    super(message);
    this.name = 'AuthDomainError';
    this.code = code;
  }
}
