import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import {
  ROLE_REPOSITORY,
  STATUS_REPOSITORY,
} from '@modules/transversal/transversal.tokens';
import type { RoleRepository } from '@modules/transversal/domain/ports/catalog/role.repository.port';
import type { StatusRepository } from '@modules/transversal/domain/ports/catalog/status.repository.port';
import { UserRepository } from '@modules/users/domain/ports/user.ports';
import { build_user_public_fields } from '@modules/users/application/mapping/user-public-fields.builder';
import { ListUsersItemResponse } from './list-users.response';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly role_repository: RoleRepository,
    @Inject(STATUS_REPOSITORY)
    private readonly status_repository: StatusRepository,
  ) {}

  async execute(): Promise<ListUsersItemResponse[]> {
    const rows = await this.user_repository.find_all();
    const out: ListUsersItemResponse[] = [];
    for (const row of rows) {
      const fields = await build_user_public_fields(
        row,
        this.role_repository,
        this.status_repository,
      );
      out.push(new ListUsersItemResponse(fields));
    }
    return out;
  }
}
