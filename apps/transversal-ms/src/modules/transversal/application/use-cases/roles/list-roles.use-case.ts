import { Inject, Injectable } from '@nestjs/common';
import { ROLE_REPOSITORY } from '@modules/transversal/transversal.tokens';
import type { RoleRepository } from '@modules/transversal/domain/ports/catalog/role.repository.port';
import type { Role } from '@modules/transversal/domain/models/role.models';
import type { ListRolesParams } from '@modules/transversal/domain/models/role.models';

export interface ListRolesResult {
  items: Role[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class ListRolesUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly role_repository: RoleRepository,
  ) {}

  async execute(query: ListRolesParams): Promise<ListRolesResult> {
    const { items, total } = await this.role_repository.list(query);
    return {
      items,
      total,
      page: query.page,
      limit: query.limit,
    };
  }
}
