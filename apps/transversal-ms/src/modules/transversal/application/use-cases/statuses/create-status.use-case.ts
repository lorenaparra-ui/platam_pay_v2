import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { STATUS_REPOSITORY } from '@modules/transversal/transversal.tokens';
import type { StatusRepository } from '@modules/transversal/domain/ports/catalog/status.repository.port';
import type { CatalogStatus } from '@modules/transversal/domain/models/status.models';
import { is_pg_unique_violation } from '@common/utils/pg-error.util';

export interface CreateStatusPayload {
  entity_type: string;
  code: string;
  display_name: string;
  description: string | null;
  is_active: boolean;
}

@Injectable()
export class CreateStatusUseCase {
  private readonly logger = new Logger(CreateStatusUseCase.name);

  constructor(
    @Inject(STATUS_REPOSITORY)
    private readonly status_repository: StatusRepository,
  ) {}

  async execute(body: CreateStatusPayload): Promise<CatalogStatus> {
    try {
      return await this.status_repository.create({
        entity_type: body.entity_type,
        code: body.code,
        display_name: body.display_name,
        description: body.description,
        is_active: body.is_active,
      });
    } catch (err: unknown) {
      if (is_pg_unique_violation(err)) {
        throw new ConflictException(
          'status already exists for this entity_type and code',
        );
      }
      this.logger.error('create status failed');
      throw err;
    }
  }
}
