import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import {
  USER_REFERENCE_LOOKUP,
  UserReferenceLookupPort,
} from '@modules/users/domain/ports/user-reference-lookup.port';
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
    @Inject(USER_REFERENCE_LOOKUP)
    private readonly reference_lookup: UserReferenceLookupPort,
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
    if (req.status_external_id !== undefined) {
      const status_id =
        await this.reference_lookup.get_status_internal_id_by_external_id(
          req.status_external_id,
        );
      if (status_id === null) {
        throw new NotFoundException('status not found');
      }
      patch.status_id = status_id;
    }
    if (req.role_external_id !== undefined) {
      if (req.role_external_id === null) {
        patch.role_id = null;
      } else {
        const role_id =
          await this.reference_lookup.get_role_internal_id_by_external_id(
            req.role_external_id,
          );
        if (role_id === null) {
          throw new NotFoundException('role not found');
        }
        patch.role_id = role_id;
      }
    }

    const updated = await this.user_repository.update_by_external_id(
      req.external_id,
      patch,
    );
    if (updated === null) {
      throw new NotFoundException('user not found');
    }

    const fields = await build_user_public_fields(updated, this.reference_lookup);
    return new UpdateUserByExternalIdResponse(fields);
  }
}
