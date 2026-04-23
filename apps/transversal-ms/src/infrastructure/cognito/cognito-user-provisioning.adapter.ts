import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  AdminGetUserCommand,
  AdminListGroupsForUserCommand,
  AdminRemoveUserFromGroupCommand,
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
  type AttributeType,
} from '@aws-sdk/client-cognito-identity-provider';
import { randomBytes } from 'crypto';
import { Roles } from '@platam/shared';
import { normalize_cognito_sub } from '@common/utils/normalize-cognito-sub';
import type {
  CognitoUserProvisioningPort,
  EnsureCognitoUserParams,
  EnsureCognitoUserResult,
} from '@modules/users/domain/ports/cognito-user-provisioning.port';

/** Nombres de grupo en Cognito alineados con `Roles` (claim `cognito:groups`). */
const COGNITO_ROLE_GROUP_NAMES = new Set<string>(
  Object.values(Roles) as string[],
);

@Injectable()
export class CognitoUserProvisioningAdapter implements CognitoUserProvisioningPort {
  private readonly logger = new Logger(CognitoUserProvisioningAdapter.name);
  private readonly client: CognitoIdentityProviderClient;

  constructor(private readonly config_service: ConfigService) {
    const region = this.config_service.getOrThrow<string>('config.cognito.region');
    this.client = new CognitoIdentityProviderClient({ region });
  }

  async ensure_user(params: EnsureCognitoUserParams): Promise<EnsureCognitoUserResult> {
    const pool_id = this.config_service.get<string>('config.cognito.userPoolId')?.trim() ?? '';
    if (pool_id.length === 0) {
      throw new Error(
        'COGNITO_USER_POOL_ID (config.cognito.userPoolId) es obligatorio para crear usuarios en Cognito.',
      );
    }

    const email = params.email.trim().toLowerCase();
    const user_attributes: AttributeType[] = [
      { Name: 'email', Value: email },
      { Name: 'email_verified', Value: 'true' },
    ];
    if (params.role_code !== null && params.role_code.trim().length > 0) {
      user_attributes.push({ Name: 'custom:role', Value: params.role_code.trim() });
    }

    try {
      const out = await this.client.send(
        new AdminCreateUserCommand({
          UserPoolId: pool_id,
          Username: email,
          UserAttributes: user_attributes,
          TemporaryPassword: this.generate_temporary_password(),
          MessageAction: 'SUPPRESS',
        }),
      );
      const sub = this.sub_from_user(out.User);
      if (sub === null) {
        throw new Error('Cognito AdminCreateUser no devolvió atributo sub');
      }
      await this.sync_identity_role_with_cognito_groups(pool_id, email, params.role_code);
      return { sub: normalize_cognito_sub(sub), username: email, created_new: true };
    } catch (err: unknown) {
      if (!this.is_username_exists(err)) {
        throw err;
      }
      const got = await this.client.send(
        new AdminGetUserCommand({ UserPoolId: pool_id, Username: email }),
      );
      const sub = this.sub_from_attributes(got.UserAttributes);
      if (sub === null) {
        throw new Error('Cognito AdminGetUser no devolvió atributo sub');
      }
      const username = got.Username?.trim() ?? email;
      await this.sync_identity_role_with_cognito_groups(pool_id, username, params.role_code);
      return { sub: normalize_cognito_sub(sub), username, created_new: false };
    }
  }

  /**
   * Alinea `cognito:groups` con el rol de negocio: quita grupos cuyo nombre está en `Roles`
   * y no coincide con el rol actual; añade el grupo homónimo al código de rol.
   */
  private async sync_identity_role_with_cognito_groups(
    pool_id: string,
    username: string,
    role_code: string | null,
  ): Promise<void> {
    const target =
      role_code !== null && role_code.trim().length > 0 ? role_code.trim() : null;

    const listed = await this.client.send(
      new AdminListGroupsForUserCommand({
        UserPoolId: pool_id,
        Username: username,
      }),
    );
    const current_role_groups =
      listed.Groups?.map((g) => g.GroupName).filter((n): n is string => !!n?.trim()) ?? [];

    for (const group_name of current_role_groups) {
      if (!COGNITO_ROLE_GROUP_NAMES.has(group_name)) {
        continue;
      }
      if (target !== null && group_name === target) {
        continue;
      }
      await this.client.send(
        new AdminRemoveUserFromGroupCommand({
          UserPoolId: pool_id,
          Username: username,
          GroupName: group_name,
        }),
      );
    }

    if (target !== null && COGNITO_ROLE_GROUP_NAMES.has(target)) {
      await this.client.send(
        new AdminAddUserToGroupCommand({
          UserPoolId: pool_id,
          Username: username,
          GroupName: target,
        }),
      );
    } else if (target !== null && !COGNITO_ROLE_GROUP_NAMES.has(target)) {
      this.logger.warn(
        `cognito_group_sync_skipped_unknown_role group=${target} username=${username}`,
      );
    }
  }

  async set_custom_db_id(username: string, db_user_id: number): Promise<void> {
    const pool_id = this.config_service.get<string>('config.cognito.userPoolId')?.trim() ?? '';
    if (pool_id.length === 0) {
      return;
    }
    await this.client.send(
      new AdminUpdateUserAttributesCommand({
        UserPoolId: pool_id,
        Username: username,
        UserAttributes: [{ Name: 'custom:db_id', Value: String(db_user_id) }],
      }),
    );
  }

  async try_delete_user(username: string): Promise<void> {
    const pool_id = this.config_service.get<string>('config.cognito.userPoolId')?.trim() ?? '';
    if (pool_id.length === 0) {
      return;
    }
    try {
      await this.client.send(
        new AdminDeleteUserCommand({ UserPoolId: pool_id, Username: username }),
      );
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      this.logger.warn(`cognito_try_delete_user_failed username=${username} ${text}`);
    }
  }

  private sub_from_user(user: { Attributes?: AttributeType[] } | undefined): string | null {
    return this.sub_from_attributes(user?.Attributes);
  }

  private sub_from_attributes(attrs: AttributeType[] | undefined): string | null {
    const raw = attrs?.find((a) => a.Name === 'sub')?.Value?.trim();
    return raw !== undefined && raw.length > 0 ? raw : null;
  }

  private is_username_exists(err: unknown): boolean {
    return (
      typeof err === 'object' &&
      err !== null &&
      'name' in err &&
      (err as { name: string }).name === 'UsernameExistsException'
    );
  }

  private generate_temporary_password(): string {
    const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lower = 'abcdefghijkmnopqrstuvwxyz';
    const digits = '23456789';
    const special = '!@#$%^&*';
    const pick = (set: string) => set[randomBytes(1)[0] % set.length];
    const body = randomBytes(12).toString('base64url').slice(0, 14);
    return `${pick(upper)}${pick(lower)}${pick(digits)}${pick(special)}${body}`;
  }
}
