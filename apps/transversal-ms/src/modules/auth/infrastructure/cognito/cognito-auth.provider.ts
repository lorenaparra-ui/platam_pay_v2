import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AssociateSoftwareTokenCommand,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
  VerifySoftwareTokenCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { createHmac } from 'crypto';
import type {
  AuthProviderPort,
  LoginWithPasswordPayload,
  SetupMfaPayload,
  VerifyMfaSetupPayload,
  VerifyTotpPayload,
} from '@modules/auth/domain/ports/auth-provider.port';
import type {
  AuthLoginResult,
  AuthMfaSetupResult,
  AuthTokens,
} from '@modules/auth/domain/models/auth-session.model';
import { AuthDomainError } from '@modules/auth/domain/models/auth-error.model';


type FlowContext = 'login' | 'totp' | 'setup' | 'mfa_setup';

@Injectable()
export class CognitoAuthProvider implements AuthProviderPort {
  private readonly logger = new Logger(CognitoAuthProvider.name);
  private readonly cognito_client: CognitoIdentityProviderClient;
  private readonly client_id: string;
  private readonly client_secret: string | null;

  constructor(private readonly config_service: ConfigService) {
    const region = this.config_service.getOrThrow<string>('config.cognito.region');
    const client_id = this.config_service.get<string>('config.cognito.clientId')?.trim() ?? '';
    const client_secret = this.config_service.get<string>('config.cognito.clientSecret')?.trim();

    if (client_id.length === 0) {
      throw new Error('Missing Cognito app client id configuration');
    }

    this.client_id = client_id;
    this.client_secret =
      client_secret !== undefined && client_secret.length > 0 ? client_secret : null;
    this.cognito_client = new CognitoIdentityProviderClient({ region });
  }

  async loginWithPassword(payload: LoginWithPasswordPayload): Promise<AuthLoginResult> {
    try {
      const username = payload.email.trim().toLowerCase();
      const auth_parameters: Record<string, string> = {
        USERNAME: username,
        PASSWORD: payload.password,
      };
      const secret_hash = this.build_secret_hash(username);
      if (secret_hash !== null) {
        auth_parameters.SECRET_HASH = secret_hash;
      }

      const response = await this.cognito_client.send(
        new InitiateAuthCommand({
          AuthFlow: 'USER_PASSWORD_AUTH',
          ClientId: this.client_id,
          AuthParameters: auth_parameters,
        }),
      );

      if (response.ChallengeName !== undefined && response.Session !== undefined) {
        if (response.ChallengeName === 'SOFTWARE_TOKEN_MFA') {
          return {
            status: 'MFA_REQUIRED',
            challengeName: 'SOFTWARE_TOKEN_MFA',
            session: response.Session,
            tokens: null,
          };
        }

        if (response.ChallengeName === 'MFA_SETUP') {
          return {
            status: 'MFA_SETUP_REQUIRED',
            challengeName: 'MFA_SETUP',
            session: response.Session,
            tokens: null,
          };
        }

        if (response.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
          return {
            status: 'PASSWORD_CHANGE_REQUIRED',
            challengeName: 'NEW_PASSWORD_REQUIRED',
            session: response.Session,
            tokens: null,
          };
        }
      }

      if (response.AuthenticationResult !== undefined) {
        return {
          status: 'AUTHENTICATED',
          challengeName: null,
          session: null,
          tokens: this.map_authentication_result(response.AuthenticationResult),
        };
      }

      throw new AuthDomainError(
        'UNEXPECTED_AUTH_ERROR',
        'Unexpected Cognito login response',
      );
    } catch (error: unknown) {
      this.map_and_throw_auth_error(error, 'login');
    }
  }

  async verifyTotp(payload: VerifyTotpPayload): Promise<AuthTokens> {
    try {
      const username = payload.email.trim().toLowerCase();
      const session = payload.session.trim();
      const totp_code = String(payload.totpCode).trim().replace(/\D/g, '');
      if (totp_code.length !== 6) {
        throw new AuthDomainError('INVALID_TOTP', 'Invalid TOTP code');
      }

      const challenge_responses: Record<string, string> = {
        USERNAME: username,
        SOFTWARE_TOKEN_MFA_CODE: totp_code,
      };

      const secret_hash = this.build_secret_hash(username);
      if (secret_hash !== null) {
        challenge_responses.SECRET_HASH = secret_hash;
      }

      const response = await this.cognito_client.send(
        new RespondToAuthChallengeCommand({
          ClientId: this.client_id,
          ChallengeName: 'SOFTWARE_TOKEN_MFA',
          Session: session,
          ChallengeResponses: challenge_responses,
        }),
      );
      if (response.AuthenticationResult === undefined) {
        throw new AuthDomainError(
          'UNEXPECTED_AUTH_ERROR',
          'Unexpected Cognito challenge response',
        );
      }

      return this.map_authentication_result(response.AuthenticationResult);
    } catch (error: unknown) {
      this.map_and_throw_auth_error(error, 'totp');
    }
  }

  async setupMfa(payload: SetupMfaPayload): Promise<AuthMfaSetupResult> {
    try {
      const session = payload.session.trim();
      const response = await this.cognito_client.send(
        new AssociateSoftwareTokenCommand({
          Session: session,
        }),
      );

      if (
        response.SecretCode === undefined ||
        response.SecretCode.length === 0 ||
        response.Session === undefined ||
        response.Session.length === 0
      ) {
        throw new AuthDomainError(
          'UNEXPECTED_AUTH_ERROR',
          'Missing Cognito MFA setup information',
        );
      }

      const issuer =
        this.config_service.get<string>('config.mfa.issuer')?.trim() || 'Platam Pay';
      const secret_code_url = this.build_totp_provisioning_url(response.SecretCode, issuer);

      return {
        secretCodeUrl: secret_code_url,
        session: response.Session,
      };
    } catch (error: unknown) {
      this.map_and_throw_auth_error(error, 'setup');
    }
  }

  async verifyMfaSetup(payload: VerifyMfaSetupPayload): Promise<AuthTokens> {
    try {
      const username = payload.email.trim().toLowerCase();
      const session = payload.session.trim();
      const totp_code = String(payload.totpCode).trim().replace(/\D/g, '');
      if (totp_code.length !== 6) {
        throw new AuthDomainError('INVALID_TOTP', 'Invalid TOTP code');
      }

      const verify_response = await this.cognito_client.send(
        new VerifySoftwareTokenCommand({
          Session: session,
          UserCode: totp_code,
        }),
      );

      if (verify_response.Status !== 'SUCCESS') {
        throw new AuthDomainError('INVALID_TOTP', 'Invalid TOTP setup code');
      }

      const challenge_responses: Record<string, string> = {
        USERNAME: username,
      };
      const secret_hash = this.build_secret_hash(username);
      if (secret_hash !== null) {
        challenge_responses.SECRET_HASH = secret_hash;
      }

      const challenge_session = verify_response.Session ?? session;
      const response = await this.cognito_client.send(
        new RespondToAuthChallengeCommand({
          ClientId: this.client_id,
          ChallengeName: 'MFA_SETUP',
          Session: challenge_session,
          ChallengeResponses: challenge_responses,
        }),
      );

      if (response.AuthenticationResult === undefined) {
        throw new AuthDomainError(
          'UNEXPECTED_AUTH_ERROR',
          'Unexpected Cognito MFA setup verification response',
        );
      }

      return this.map_authentication_result(response.AuthenticationResult);
    } catch (error: unknown) {
      this.map_and_throw_auth_error(error, 'mfa_setup');
    }
  }

  private map_authentication_result(result: {
    AccessToken?: string;
    IdToken?: string;
    RefreshToken?: string;
    ExpiresIn?: number;
    TokenType?: string;
  }): AuthTokens {
    if (
      result.AccessToken === undefined ||
      result.AccessToken.length === 0 ||
      result.IdToken === undefined ||
      result.IdToken.length === 0
    ) {
      throw new AuthDomainError('UNEXPECTED_AUTH_ERROR', 'Missing required Cognito tokens');
    }

    return {
      accessToken: result.AccessToken,
      idToken: result.IdToken,
      refreshToken: result.RefreshToken ?? null,
      expiresIn: result.ExpiresIn ?? 0,
      tokenType: result.TokenType ?? 'Bearer',
    };
  }

  private build_secret_hash(username: string): string | null {
    if (this.client_secret === null) {
      return null;
    }

    return createHmac('sha256', this.client_secret)
      .update(`${username}${this.client_id}`)
      .digest('base64');
  }

  private build_totp_provisioning_url(secret_code: string, issuer: string): string {
    const encoded_issuer = encodeURIComponent(issuer);
    const label = encoded_issuer;
    return `otpauth://totp/${label}?secret=${secret_code}&issuer=${encoded_issuer}`;
  }

  private map_and_throw_auth_error(error: unknown, context: FlowContext): never {
    if (error instanceof AuthDomainError) {
      throw error;
    }

    const error_name =
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      typeof (error as { name: unknown }).name === 'string'
        ? (error as { name: string }).name
        : 'UnknownError';

    const error_message =
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as { message: unknown }).message === 'string'
        ? (error as { message: string }).message.toLowerCase()
        : '';

    if (
      ['UserLockedOutException', 'TooManyFailedAttemptsException', 'LimitExceededException'].includes(
        error_name,
      )
    ) {
      throw new AuthDomainError('ACCOUNT_LOCKED', 'Account locked');
    }

    if (context === 'login') {
      if (
        [
          'NotAuthorizedException',
          'UserNotFoundException',
          'UserNotConfirmedException',
          'PasswordResetRequiredException',
        ].includes(error_name)
      ) {
        throw new AuthDomainError('INVALID_CREDENTIALS', 'Invalid credentials');
      }
    }

    if (context === 'totp') {
      if (['CodeMismatchException'].includes(error_name)) {
        throw new AuthDomainError('INVALID_TOTP', 'Invalid TOTP code');
      }
      if (
        ['ExpiredCodeException'].includes(error_name) ||
        (error_name === 'NotAuthorizedException' && error_message.includes('session'))
      ) {
        throw new AuthDomainError('SESSION_EXPIRED', 'Expired session');
      }
      if (error_name === 'NotAuthorizedException') {
        throw new AuthDomainError('INVALID_TOTP', 'Invalid TOTP code');
      }
    }

    if (context === 'setup') {
      if (
        ['ExpiredCodeException'].includes(error_name) ||
        (error_name === 'NotAuthorizedException' && error_message.includes('session'))
      ) {
        throw new AuthDomainError('SESSION_EXPIRED', 'Expired session');
      }
    }

    if (context === 'mfa_setup') {
      if (['CodeMismatchException', 'EnableSoftwareTokenMFAException'].includes(error_name)) {
        throw new AuthDomainError('INVALID_TOTP', 'Invalid TOTP code');
      }
      if (
        ['ExpiredCodeException'].includes(error_name) ||
        (error_name === 'NotAuthorizedException' && error_message.includes('session'))
      ) {
        throw new AuthDomainError('SESSION_EXPIRED', 'Expired session');
      }
    }

    this.logger.warn(
      `cognito_unmapped_error context=${context} name=${error_name} -> UNEXPECTED_AUTH_ERROR`,
    );
    throw new AuthDomainError('UNEXPECTED_AUTH_ERROR', 'Unexpected authentication error');
  }
}
