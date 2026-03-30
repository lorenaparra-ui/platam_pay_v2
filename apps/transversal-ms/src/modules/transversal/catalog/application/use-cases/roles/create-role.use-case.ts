import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ROLE_REPOSITORY } from '@modules/transversal/catalog.tokens';
import type { RoleRepository } from '@modules/transversal/catalog/domain/ports/role.repository.port';
import type { Role } from '@modules/transversal/catalog/domain/models/role.models';
import { is_pg_unique_violation } from '@common/utils/pg-error.util';

export interface CreateRolePayload {
  name: string;
  description: string | null;
}

@Injectable()
export class CreateRoleUseCase {
  private readonly logger = new Logger(CreateRoleUseCase.name);

  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly role_repository: RoleRepository,
  ) {}

  async execute(body: CreateRolePayload): Promise<Role> {
    try {
      const role = await this.role_repository.create({
        name: body.name,
        description: body.description,
      });
      return role;
    } catch (err: unknown) {
      if (is_pg_unique_violation(err)) {
        throw new ConflictException('role already exists');
      }
      this.logger.error('create role failed');
      throw err;
    }
  }
}
