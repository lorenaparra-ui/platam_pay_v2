import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ROLE_REPOSITORY } from '@modules/transversal/transversal.tokens';
import type { RoleRepository } from '@modules/transversal/domain/ports/catalog/role.repository.port';
import type { Role } from '@modules/transversal/domain/models/role.models';

@Injectable()
export class GetRoleByExternalIdUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly role_repository: RoleRepository,
  ) {}

  async execute(external_id: string): Promise<Role> {
    const role = await this.role_repository.find_by_external_id(external_id);
    if (role === null) {
      throw new NotFoundException('role not found');
    }
    return role;
  }
}
