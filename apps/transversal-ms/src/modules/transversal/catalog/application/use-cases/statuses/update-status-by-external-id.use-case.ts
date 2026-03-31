import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { STATUS_REPOSITORY } from '@modules/transversal/catalog.tokens';
import type { StatusRepository } from '@modules/transversal/catalog/domain/ports/status.repository.port';
import type {
  CatalogStatus,
  UpdateStatusProps,
} from '@modules/transversal/catalog/domain/models/status.models';
import { is_pg_unique_violation } from '@common/utils/pg-error.util';

export interface UpdateStatusPayload {
  entity_type?: string;
  code?: string;
  display_name?: string;
  description?: string | null;
  is_active?: boolean;
}

@Injectable()
export class UpdateStatusByExternalIdUseCase {
  private readonly logger = new Logger(UpdateStatusByExternalIdUseCase.name);

  constructor(
    @Inject(STATUS_REPOSITORY)
    private readonly status_repository: StatusRepository,
  ) {}

  async execute(
    external_id: string,
    body: UpdateStatusPayload,
  ): Promise<CatalogStatus> {
    const patch: UpdateStatusProps = {};
    if (body.entity_type !== undefined) {
      patch.entity_type = body.entity_type;
    }
    if (body.code !== undefined) {
      patch.code = body.code;
    }
    if (body.display_name !== undefined) {
      patch.display_name = body.display_name;
    }
    if (body.description !== undefined) {
      patch.description = body.description;
    }
    if (body.is_active !== undefined) {
      patch.is_active = body.is_active;
    }
    try {
      const updated = await this.status_repository.update_by_external_id(
        external_id,
        patch,
      );
      if (updated === null) {
        throw new NotFoundException('status not found');
      }
      return updated;
    } catch (err: unknown) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      if (is_pg_unique_violation(err)) {
        throw new ConflictException(
          'status already exists for this entity_type and code',
        );
      }
      this.logger.error('update status failed');
      throw err;
    }
  }
}
