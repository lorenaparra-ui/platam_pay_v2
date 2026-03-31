import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ROLE_REPOSITORY } from '@modules/transversal/transversal.tokens';
import type { RoleRepository } from '@modules/transversal/domain/ports/catalog/role.repository.port';

@Injectable()
export class DeleteRoleByExternalIdUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly role_repository: RoleRepository,
  ) {}

  async execute(external_id: string): Promise<void> {
    const deleted = await this.role_repository.delete_by_external_id(
      external_id,
    );
    if (deleted) {
      return;
    }
    const exists = await this.role_repository.find_by_external_id(external_id);
    if (exists === null) {
      throw new NotFoundException('role not found');
    }
    throw new ConflictException('role is assigned to users');
  }
}
