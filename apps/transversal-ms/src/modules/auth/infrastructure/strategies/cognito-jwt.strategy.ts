import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import { ROLE_REPOSITORY } from '@modules/transversal/transversal.tokens';
import type { UserRepository } from '@modules/users/domain/ports/user.ports';
import type { RoleRepository } from '@modules/transversal/domain/ports/catalog/role.repository.port';
import type { RequestContext } from '@modules/auth/application/request-context.interface';
import { normalize_cognito_sub } from '@common/utils/normalize-cognito-sub';

interface CognitoAccessPayload {
  sub?: string; // Cognito Subject - UUID user id (e.g. '018bb500-e0b1-70a9-13e0-63c2dcfd724a')
  iss?: string; // Issuer (e.g. 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_Nx4vYRz63')
  client_id?: string; // Cognito App Client ID (e.g. 'k2fca9hhf0he0tadlhfcj7ntj')
  origin_jti?: string;
  event_id?: string;
  token_use?: string; // 'access'
  scope?: string;
  auth_time?: number;
  exp?: number;
  iat?: number;
  jti?: string;
  username?: string; // e.g. 'dev.customer@platam.local'
}

@Injectable()
export class CognitoJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(CognitoJwtStrategy.name);

  constructor(
    private readonly config_service: ConfigService,
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly role_repository: RoleRepository,
  ) {
    const region = config_service.getOrThrow<string>('config.cognito.region');
    const user_pool_id = config_service.get<string>('config.cognito.userPoolId')?.trim();
    if (!user_pool_id) {
      throw new Error(
        'COGNITO_USER_POOL_ID es obligatorio para autenticación JWT (config.cognito.userPoolId).',
      );
    }
    const issuer = `https://cognito-idp.${region}.amazonaws.com/${user_pool_id}`;
    const jwks_uri = `${issuer}/.well-known/jwks.json`;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      issuer,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: jwks_uri,
      }),
    });
  }

  async validate(payload: CognitoAccessPayload): Promise<RequestContext> {
 
    if (payload.token_use !== 'access') { 
      this.reject('invalid_token_use');
    }
    const expected_client_id = this.config_service
      .get<string>('config.cognito.clientId')
      ?.trim();
    if (
      expected_client_id &&
      payload.client_id !== undefined &&
      payload.client_id !== expected_client_id
    ) {
      this.reject('client_id_mismatch');
    }
    const token_sub = normalize_cognito_sub(payload.sub ?? '');
    if (token_sub.length === 0) {
      this.reject('missing_sub');
    }

    const user = await this.user_repository.find_by_email(payload.username ?? '');

 
    if (user === null || user.state !== 'active') {
      this.reject('user_not_found_or_inactive');
    }
    if (normalize_cognito_sub(user.cognito_sub) !== token_sub) {
      this.reject('cognito_sub_mismatch');
    }

    if (typeof payload.username === 'string' && payload.username.trim() !== '') {
      const claim_email = payload.username.trim().toLowerCase();
      if (claim_email !== user.email.trim().toLowerCase()) {
        this.reject('email_claim_mismatch');
      }
    }

    if (user.role_id === null) {
      this.reject('user_missing_role');
    }
    const role = await this.role_repository.find_by_internal_id(user.role_id);
    if (role === null) {
      this.reject('role_not_found');
    }

    return {
      internalUserId: user.internal_id,
      /** Mismo valor canónico que el claim `sub` del access token. */
      cognitoSub: token_sub,
      email: user.email,
      roleCode: role.name,
      parentId: user.parent_id,
      hierarchyPath: user.hierarchy_path,
    };
  }

  private reject(reason: string): never {
    this.logger.warn(`cognito_jwt_validate_rejected code=${reason}`);
    throw new UnauthorizedException();
  }
}
