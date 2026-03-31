import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { STATUS_REPOSITORY } from '@modules/transversal/catalog.tokens';
import type { StatusRepository } from '@modules/transversal/catalog/domain/ports/status.repository.port';
import type { CatalogStatus } from '@modules/transversal/catalog/domain/models/status.models';

@Injectable()
export class GetStatusByExternalIdUseCase {
  constructor(
    @Inject(STATUS_REPOSITORY)
    private readonly status_repository: StatusRepository,
  ) {}

  async execute(external_id: string): Promise<CatalogStatus> {
    const row = await this.status_repository.find_by_external_id(external_id);
    if (row === null) {
      throw new NotFoundException('status not found');
    }
    return row;
  }
}
