import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
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
      throw new Error('COGNITO_USER_POOL_ID es obligatorio para autenticación JWT.');
    }
    const issuer = `https://cognito-idp.${region}.amazonaws.com/${user_pool_id}`;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      issuer,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: `${issuer}/.well-known/jwks.json`,
      }),
    });
  }

  async validate(payload: CognitoAccessPayload): Promise<RequestContext> {
    if (payload.token_use !== 'access') {
      this.reject('invalid_token_use');
    }

    const expected_client_id = this.config_service.get<string>('config.cognito.clientId')?.trim();
    if (
      expected_client_id &&
      payload.client_id !== undefined &&
      payload.client_id !== expected_client_id
    ) {
      this.reject('client_id_mismatch');
    }

    const sub = payload.sub?.trim();
    if (!sub) {
      this.reject('missing_sub');
    }

    const normalized_sub = sub.toLowerCase();
    const user = await this.user_repository.findOne({
      where: { cognitoSub: normalized_sub },
      select: { id: true, cognitoSub: true, email: true, roleId: true, state: true, parent_id: true, hierarchyPath: true },
    });
    if (user === null || user.state !== UserState.ACTIVE) {
      this.reject('user_not_found_or_inactive');
    }

    if (typeof payload.email === 'string' && payload.email.trim() !== '') {
      if (payload.email.trim().toLowerCase() !== user.email.trim().toLowerCase()) {
        this.reject('email_claim_mismatch');
      }
    }

    const role = await this.role_repository.findOne({
      where: { id: user.roleId },
      select: { id: true, name: true },
    });
    if (role === null) {
      this.reject('role_not_found');
    }

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
    this.logger.warn(`cognito_jwt_rejected code=${reason}`);
    throw new UnauthorizedException();
  }
}
