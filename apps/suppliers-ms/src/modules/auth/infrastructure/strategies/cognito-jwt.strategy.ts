import {
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { RoleEntity, UserEntity } from '@app/transversal-data';
import { UserState } from '@platam/shared';
import type { RequestContext } from '@modules/auth/application/request-context.interface';

interface CognitoAccessPayload {
  sub?: string;
  token_use?: string;
  client_id?: string;
  email?: string;
}

const USER_JWT_SELECT = {
  id: true,
  cognitoSub: true,
  email: true,
  roleId: true,
  state: true,
  parent_id: true,
  hierarchyPath: true,
} as const;

@Injectable()
export class CognitoJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(CognitoJwtStrategy.name);

  constructor(
    private readonly config_service: ConfigService,
    @InjectRepository(UserEntity)
    private readonly user_repository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly role_repository: Repository<RoleEntity>,
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
    this.logger.log('1.strategy_validate_start');
    if (payload.token_use !== 'access') {
      this.reject('invalid_token_use');
    }
    this.logger.log('1.strategy_token_use_access_ok');
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
    this.logger.log('1.strategy_client_id_ok');
    const sub = payload.sub?.trim();
    if (!sub) {
      this.reject('missing_sub');
    }

    const normalized_sub = sub.toLowerCase();
    this.logger.log('1.strategy_before_find_user_by_cognito_sub');
    const user = await this.user_repository.findOne({
      where: { cognitoSub: normalized_sub },
      select: USER_JWT_SELECT,
    });
    this.logger.log(
      `1.strategy_after_find_user found=${user}`,
    );
    if (user === null || user.state !== UserState.ACTIVE) {
      this.reject('user_not_found_or_inactive');
    }
    if (user.cognitoSub.trim().toLowerCase() !== normalized_sub) {
      this.reject('cognito_sub_mismatch');
    }
    this.logger.log('1.strategy_cognito_sub_match_ok');

    if (typeof payload.email === 'string' && payload.email.trim() !== '') {
      const claim_email = payload.email.trim().toLowerCase();
      if (claim_email !== user.email.trim().toLowerCase()) {
        this.reject('email_claim_mismatch');
      }
      this.logger.log('1.strategy_email_claim_match_ok');
    } else {
      this.logger.log('1.strategy_email_claim_skipped');
    }

    this.logger.log('1.strategy_before_find_role');
    const role = await this.role_repository.findOne({
      where: { id: user.roleId },
      select: { id: true, name: true },
    });
    this.logger.log(`1.strategy_after_find_role found=${role !== null} name=${role?.name ?? 'n/a'}`);
    if (role === null) {
      this.reject('role_not_found');
    }

    this.logger.log('1.strategy_validate_done');
    return {
      internalUserId: user.id,
      cognitoSub: user.cognitoSub,
      email: user.email,
      roleCode: role.name,
      parentId: user.parent_id,
      hierarchyPath: user.hierarchyPath,
    };
  }

  private reject(reason: string): never {
    this.logger.log(`1.strategy_reject reason=${reason}`);
    this.logger.warn(`cognito_jwt_validate_rejected code=${reason}`);
    throw new UnauthorizedException();
  }
}
