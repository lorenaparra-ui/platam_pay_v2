import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import {
  ROLE_REPOSITORY,
  STATUS_REPOSITORY,
} from '@modules/transversal/transversal.tokens';
import type { RoleRepository } from '@modules/transversal/domain/ports/catalog/role.repository.port';
import type { StatusRepository } from '@modules/transversal/domain/ports/catalog/status.repository.port';
import { UserRepository } from '@modules/users/domain/ports/user.ports';
import { build_user_public_fields } from '@modules/users/application/mapping/user-public-fields.builder';
import { GetUserByExternalIdRequest } from './get-user-by-external-id.request';
import { GetUserByExternalIdResponse } from './get-user-by-external-id.response';

@Injectable()
export class GetUserByExternalIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly role_repository: RoleRepository,
    @Inject(STATUS_REPOSITORY)
    private readonly status_repository: StatusRepository,
  ) {}

  async execute(
    req: GetUserByExternalIdRequest,
  ): Promise<GetUserByExternalIdResponse> {
    const row = await this.user_repository.find_by_external_id(req.external_id);
    if (row === null) {
      throw new NotFoundException('user not found');
    }
    const fields = await build_user_public_fields(
      row,
      this.role_repository,
      this.status_repository,
    );
    return new GetUserByExternalIdResponse(fields);
  }
}
