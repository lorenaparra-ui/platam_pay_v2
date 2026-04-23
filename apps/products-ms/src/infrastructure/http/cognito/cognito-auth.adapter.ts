import { Injectable, Logger } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class CognitoAuthAdapter {
  private readonly logger = new Logger(CognitoAuthAdapter.name);
  private readonly client = new CognitoIdentityProviderClient({ region: 'us-east-1' });

  private cachedToken: string | null = null;
  private tokenExpiresAt: number = 0;

  async get_token(): Promise<string> {
    if (this.cachedToken && Date.now() < this.tokenExpiresAt - 30 * 60 * 1000) {
      return this.cachedToken;
    }

    const client_id = process.env.SCRAPING_COGNITO_CLIENT_ID;
    const username = process.env.SCRAPING_COGNITO_USERNAME;
    const password = process.env.SCRAPING_COGNITO_PASSWORD;

    if (!client_id || !username || !password) {
      throw new Error('SCRAPING_COGNITO_CLIENT_ID / USERNAME / PASSWORD no configurados');
    }

    const response = await this.client.send(
      new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: client_id,
        AuthParameters: { USERNAME: username, PASSWORD: password },
      }),
    );

    const result = response.AuthenticationResult;
    if (!result?.IdToken) {
      throw new Error('[CognitoAuth] InitiateAuth no devolvió IdToken');
    }

    this.cachedToken = result.IdToken;
    this.tokenExpiresAt = Date.now() + (result.ExpiresIn ?? 86400) * 1000;
    this.logger.log('[CognitoAuth] token renovado');
    return this.cachedToken;
  }
}
