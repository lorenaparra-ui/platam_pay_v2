import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  COGNITO_USER_PROVISIONING_PORT,
  USER_REPOSITORY,
} from '@modules/users/users.tokens';
import { ROLE_REPOSITORY } from '@modules/transversal/transversal.tokens';
import type { RoleRepository } from '@modules/transversal/domain/ports/catalog/role.repository.port';
import type { CognitoUserProvisioningPort } from '@modules/users/domain/ports/cognito-user-provisioning.port';
import { UserRepository } from '@modules/users/domain/ports/user.ports';
import { build_user_public_fields } from '@modules/users/application/mapping/user-public-fields.builder';
import { CreateUserRequest } from './create-user.request';
import { CreateUserResponse } from './create-user.response';
import { normalize_cognito_sub } from '@common/utils/normalize-cognito-sub';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly role_repository: RoleRepository,
    @Inject(COGNITO_USER_PROVISIONING_PORT)
    private readonly cognito_user_provisioning: CognitoUserProvisioningPort,
  ) {}

  async execute(req: CreateUserRequest): Promise<CreateUserResponse> {
    let role_id: number | null = null;
    let role_code: string | null = null;
    if (req.role_external_id !== null) {
      const role = await this.role_repository.find_by_external_id(
        req.role_external_id,
      );
      if (role === null) {
        throw new NotFoundException('role not found');
      }
      role_id = role.id;
      role_code = role.name;
    }

    const manual_sub = req.cognito_sub?.trim() ?? '';
    let cognito_sub = manual_sub.length > 0 ? normalize_cognito_sub(manual_sub) : null;
    let cognito_username: string | null = null;
    let rollback_delete_cognito = false;

    try {
      if (cognito_sub === null) {
        const ensured = await this.cognito_user_provisioning.ensure_user({
          email: req.email,
          role_code,
        });
        cognito_sub = ensured.sub;
        cognito_username = ensured.username;
        rollback_delete_cognito = ensured.created_new;
      }

      const created = await this.user_repository.create({
        cognito_sub,
        email: req.email.trim().toLowerCase(),
        role_id,
        state: req.state,
        last_login_at: req.last_login_at,
      });

      if (cognito_username !== null) {
        await this.cognito_user_provisioning.set_custom_db_id(
          cognito_username,
          created.internal_id,
        );
      }

      const fields = await build_user_public_fields(created, this.role_repository);
      return new CreateUserResponse(fields);
    } catch (err) {
      if (rollback_delete_cognito && cognito_username !== null) {
        await this.cognito_user_provisioning.try_delete_user(cognito_username);
      }
      throw err;
    }
  }
}
