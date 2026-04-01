import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import { ROLE_REPOSITORY } from '@modules/transversal/transversal.tokens';
import type { RoleRepository } from '@modules/transversal/domain/ports/catalog/role.repository.port';
import { UserRepository } from '@modules/users/domain/ports/user.ports';
import { build_user_public_fields } from '@modules/users/application/mapping/user-public-fields.builder';
import { CreateUserRequest } from './create-user.request';
import { CreateUserResponse } from './create-user.response';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly role_repository: RoleRepository,
  ) {}

  async execute(req: CreateUserRequest): Promise<CreateUserResponse> {
    let role_id: number | null = null;
    if (req.role_external_id !== null) {
      const role = await this.role_repository.find_by_external_id(
        req.role_external_id,
      );
      if (role === null) {
        throw new NotFoundException('role not found');
      }
      role_id = role.id;
    }

    const created = await this.user_repository.create({
      cognito_sub: req.cognito_sub,
      email: req.email,
      role_id,
      state: req.state,
      last_login_at: req.last_login_at,
    });

    const fields = await build_user_public_fields(created, this.role_repository);
    return new CreateUserResponse(fields);
  }
}
