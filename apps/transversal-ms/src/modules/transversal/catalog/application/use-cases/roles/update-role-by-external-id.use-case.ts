import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ROLE_REPOSITORY } from '@modules/transversal/catalog.tokens';
import type { RoleRepository } from '@modules/transversal/catalog/domain/ports/role.repository.port';
import type { Role, UpdateRoleProps } from '@modules/transversal/catalog/domain/models/role.models';
import { is_pg_unique_violation } from '@common/utils/pg-error.util';

@Injectable()
export class UpdateRoleByExternalIdUseCase {
  private readonly logger = new Logger(UpdateRoleByExternalIdUseCase.name);

  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly role_repository: RoleRepository,
  ) {}

  async execute(
    external_id: string,
    patch: UpdateRoleProps,
  ): Promise<Role> {
    try {
      const updated = await this.role_repository.update_by_external_id(
        external_id,
        patch,
      );
      if (updated === null) {
        throw new NotFoundException('role not found');
      }
      return updated;
    } catch (err: unknown) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      if (is_pg_unique_violation(err)) {
        throw new ConflictException('role name already exists');
      }
      this.logger.error('update role failed');
      throw err;
    }
  }
}
