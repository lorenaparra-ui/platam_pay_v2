import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import { ROLE_REPOSITORY } from '@modules/transversal/transversal.tokens';
import type { RoleRepository } from '@modules/transversal/domain/ports/catalog/role.repository.port';
import { UserRepository } from '@modules/users/domain/ports/user.ports';
import { UpdateUserProps } from '@modules/users/domain/models/user.models';
import { build_user_public_fields } from '@modules/users/application/mapping/user-public-fields.builder';
import { UpdateUserByExternalIdRequest } from './update-user-by-external-id.request';
import { UpdateUserByExternalIdResponse } from './update-user-by-external-id.response';

@Injectable()
export class UpdateUserByExternalIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly role_repository: RoleRepository,
  ) {}

  async execute(
    req: UpdateUserByExternalIdRequest,
  ): Promise<UpdateUserByExternalIdResponse> {
    const patch: UpdateUserProps = {};

    if (req.cognito_sub !== undefined) {
      patch.cognito_sub = req.cognito_sub;
    }
    if (req.email !== undefined) {
      patch.email = req.email;
    }
    if (req.last_login_at !== undefined) {
      patch.last_login_at = req.last_login_at;
    }
    if (req.state !== undefined) {
      patch.state = req.state;
    }
    if (req.role_external_id !== undefined) {
      if (req.role_external_id === null) {
        patch.role_id = null;
      } else {
        const role = await this.role_repository.find_by_external_id(
          req.role_external_id,
        );
        if (role === null) {
          throw new NotFoundException('role not found');
        }
        patch.role_id = role.id;
      }
    }

    const updated = await this.user_repository.update_by_external_id(
      req.external_id,
      patch,
    );
    if (updated === null) {
      throw new NotFoundException('user not found');
    }

    const fields = await build_user_public_fields(updated, this.role_repository);
    return new UpdateUserByExternalIdResponse(fields);
  }
}
