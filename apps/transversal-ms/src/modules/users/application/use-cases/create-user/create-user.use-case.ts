import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import {
  USER_REFERENCE_LOOKUP,
  UserReferenceLookupPort,
} from '@modules/users/domain/ports/user-reference-lookup.port';
import { UserRepository } from '@modules/users/domain/ports/user.ports';
import { build_user_public_fields } from '@modules/users/application/mapping/user-public-fields.builder';
import { CreateUserRequest } from './create-user.request';
import { CreateUserResponse } from './create-user.response';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
    @Inject(USER_REFERENCE_LOOKUP)
    private readonly reference_lookup: UserReferenceLookupPort,
  ) {}

  async execute(req: CreateUserRequest): Promise<CreateUserResponse> {
    const status_id =
      await this.reference_lookup.get_status_internal_id_by_external_id(
        req.status_external_id,
      );
    if (status_id === null) {
      throw new NotFoundException('status not found');
    }

    let role_id: number | null = null;
    if (req.role_external_id !== null) {
      role_id = await this.reference_lookup.get_role_internal_id_by_external_id(
        req.role_external_id,
      );
      if (role_id === null) {
        throw new NotFoundException('role not found');
      }
    }

    const created = await this.user_repository.create({
      cognito_sub: req.cognito_sub,
      email: req.email,
      role_id,
      status_id,
      last_login_at: req.last_login_at,
    });

    const fields = await build_user_public_fields(created, this.reference_lookup);
    return new CreateUserResponse(fields);
  }
}
