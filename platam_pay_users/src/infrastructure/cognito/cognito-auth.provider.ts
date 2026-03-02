import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AssociateSoftwareTokenCommand,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
  VerifySoftwareTokenCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { createHmac } from 'crypto';
import {
  AuthProviderPort,
  LoginWithPasswordPayload,
  SetupMfaPayload,
  VerifyMfaSetupPayload,
  VerifyTotpPayload,
} from '@auth/domain/ports/auth-provider.port';
import {
  AuthLoginResult,
  AuthMfaSetupResult,
  AuthTokens,
} from '@auth/domain/models/auth-session.model';
import { AuthDomainError } from '@auth/domain/models/auth-error.model';

type FlowContext = 'login' | 'totp' | 'setup' | 'mfa_setup';

@Injectable()
export class CognitoAuthProvider implements AuthProviderPort {
  private readonly cognitoClient: CognitoIdentityProviderClient;
  private readonly clientId: string;
  private readonly clientSecret: string | null;

  constructor(private readonly configService: ConfigService) {
    const region =
      this.configService.get<string>('config.cognito.region') ?? 'us-east-2';
    this.clientId =
      this.configService.get<string>('config.cognito.clientId') ?? '';
    this.clientSecret =
      this.configService.get<string>('config.cognito.clientSecret') || null;

    if (!this.clientId) {
      throw new Error('Missing Cognito app client id configuration');
    }

    this.cognitoClient = new CognitoIdentityProviderClient({ region });
  }

  async loginWithPassword(
    payload: LoginWithPasswordPayload,
  ): Promise<AuthLoginResult> {
    try {
      const authParameters: Record<string, string> = {
        USERNAME: payload.email,
        PASSWORD: payload.password,
      };
      const secretHash = this.buildSecretHash(payload.email);
      if (secretHash) {
        authParameters.SECRET_HASH = secretHash;
      }

      const response = await this.cognitoClient.send(
        new InitiateAuthCommand({
          AuthFlow: 'USER_PASSWORD_AUTH',
          ClientId: this.clientId,
          AuthParameters: authParameters,
        }),
      );

      if (response.ChallengeName && response.Session) {
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

      if (response.AuthenticationResult) {
        return {
          status: 'AUTHENTICATED',
          challengeName: null,
          session: null,
          tokens: this.mapAuthenticationResult(response.AuthenticationResult),
        };
      }

      throw new AuthDomainError(
        'UNEXPECTED_AUTH_ERROR',
        'Unexpected Cognito login response',
      );
    } catch (error) {
      this.mapAndThrowAuthError(error, 'login');
    }
  }

  async verifyTotp(payload: VerifyTotpPayload): Promise<AuthTokens> {
    try {
      const challengeResponses: Record<string, string> = {
        USERNAME: payload.email,
        SOFTWARE_TOKEN_MFA_CODE: payload.totpCode,
      };
      const secretHash = this.buildSecretHash(payload.email);
      if (secretHash) {
        challengeResponses.SECRET_HASH = secretHash;
      }

      const response = await this.cognitoClient.send(
        new RespondToAuthChallengeCommand({
          ClientId: this.clientId,
          ChallengeName: 'SOFTWARE_TOKEN_MFA',
          Session: payload.session,
          ChallengeResponses: challengeResponses,
        }),
      );

      if (!response.AuthenticationResult) {
        throw new AuthDomainError(
          'UNEXPECTED_AUTH_ERROR',
          'Unexpected Cognito challenge response',
        );
      }

      return this.mapAuthenticationResult(response.AuthenticationResult);
    } catch (error) {
      this.mapAndThrowAuthError(error, 'totp');
    }
  }

  async setupMfa(payload: SetupMfaPayload): Promise<AuthMfaSetupResult> {
    try {
      const response = await this.cognitoClient.send(
        new AssociateSoftwareTokenCommand({
          Session: payload.session,
        }),
      );

      if (!response.SecretCode || !response.Session) {
        throw new AuthDomainError(
          'UNEXPECTED_AUTH_ERROR',
          'Missing Cognito MFA setup information',
        );
      }

      return {
        secretCode: response.SecretCode,
        session: response.Session,
      };
    } catch (error) {
      this.mapAndThrowAuthError(error, 'setup');
    }
  }

  async verifyMfaSetup(payload: VerifyMfaSetupPayload): Promise<AuthTokens> {
    try {
      const verifyResponse = await this.cognitoClient.send(
        new VerifySoftwareTokenCommand({
          Session: payload.session,
          UserCode: payload.totpCode,
        }),
      );

      if (verifyResponse.Status !== 'SUCCESS') {
        throw new AuthDomainError('INVALID_TOTP', 'Invalid TOTP setup code');
      }

      const challengeResponses: Record<string, string> = {
        USERNAME: payload.email,
      };
      const secretHash = this.buildSecretHash(payload.email);
      if (secretHash) {
        challengeResponses.SECRET_HASH = secretHash;
      }

      const challengeSession = verifyResponse.Session ?? payload.session;
      const response = await this.cognitoClient.send(
        new RespondToAuthChallengeCommand({
          ClientId: this.clientId,
          ChallengeName: 'MFA_SETUP',
          Session: challengeSession,
          ChallengeResponses: challengeResponses,
        }),
      );

      if (!response.AuthenticationResult) {
        throw new AuthDomainError(
          'UNEXPECTED_AUTH_ERROR',
          'Unexpected Cognito MFA setup verification response',
        );
      }

      return this.mapAuthenticationResult(response.AuthenticationResult);
    } catch (error) {
      this.mapAndThrowAuthError(error, 'mfa_setup');
    }
  }

  private mapAuthenticationResult(result: {
    AccessToken?: string;
    IdToken?: string;
    RefreshToken?: string;
    ExpiresIn?: number;
    TokenType?: string;
  }): AuthTokens {
    if (!result.AccessToken || !result.IdToken) {
      throw new AuthDomainError(
        'UNEXPECTED_AUTH_ERROR',
        'Missing required Cognito tokens',
      );
    }

    return {
      accessToken: result.AccessToken,
      idToken: result.IdToken,
      refreshToken: result.RefreshToken ?? null,
      expiresIn: result.ExpiresIn ?? 0,
      tokenType: result.TokenType ?? 'Bearer',
    };
  }

  private buildSecretHash(username: string): string | null {
    if (!this.clientSecret) {
      return null;
    }

    return createHmac('sha256', this.clientSecret)
      .update(`${username}${this.clientId}`)
      .digest('base64');
  }

  private mapAndThrowAuthError(error: unknown, context: FlowContext): never {
    if (error instanceof AuthDomainError) {
      throw error;
    }

    const errorName =
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      typeof error.name === 'string'
        ? error.name
        : 'UnknownError';

    const errorMessage =
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof error.message === 'string'
        ? error.message.toLowerCase()
        : '';

    if (
      [
        'UserLockedOutException',
        'TooManyFailedAttemptsException',
        'LimitExceededException',
      ].includes(errorName)
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
        ].includes(errorName)
      ) {
        throw new AuthDomainError('INVALID_CREDENTIALS', 'Invalid credentials');
      }
    }

    if (context === 'totp') {
      if (['CodeMismatchException'].includes(errorName)) {
        throw new AuthDomainError('INVALID_TOTP', 'Invalid TOTP code');
      }
      if (
        ['ExpiredCodeException'].includes(errorName) ||
        (errorName === 'NotAuthorizedException' &&
          errorMessage.includes('session'))
      ) {
        throw new AuthDomainError('SESSION_EXPIRED', 'Expired session');
      }
      if (errorName === 'NotAuthorizedException') {
        throw new AuthDomainError('INVALID_TOTP', 'Invalid TOTP code');
      }
    }

    if (context === 'setup') {
      if (
        ['ExpiredCodeException'].includes(errorName) ||
        (errorName === 'NotAuthorizedException' &&
          errorMessage.includes('session'))
      ) {
        throw new AuthDomainError('SESSION_EXPIRED', 'Expired session');
      }
    }

    if (context === 'mfa_setup') {
      if (['CodeMismatchException', 'EnableSoftwareTokenMFAException'].includes(errorName)) {
        throw new AuthDomainError('INVALID_TOTP', 'Invalid TOTP code');
      }
      if (
        ['ExpiredCodeException'].includes(errorName) ||
        (errorName === 'NotAuthorizedException' &&
          errorMessage.includes('session'))
      ) {
        throw new AuthDomainError('SESSION_EXPIRED', 'Expired session');
      }
    }

    throw new AuthDomainError(
      'UNEXPECTED_AUTH_ERROR',
      'Unexpected authentication error',
    );
  }
}

