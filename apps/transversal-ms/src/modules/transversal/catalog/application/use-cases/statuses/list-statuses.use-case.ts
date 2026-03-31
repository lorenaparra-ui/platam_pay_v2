import { Inject, Injectable } from '@nestjs/common';
import { STATUS_REPOSITORY } from '@modules/transversal/catalog.tokens';
import type { StatusRepository } from '@modules/transversal/catalog/domain/ports/status.repository.port';
import type {
  CatalogStatus,
  ListStatusesParams,
} from '@modules/transversal/catalog/domain/models/status.models';

export interface ListStatusesResult {
  items: CatalogStatus[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class ListStatusesUseCase {
  constructor(
    @Inject(STATUS_REPOSITORY)
    private readonly status_repository: StatusRepository,
  ) {}

  async execute(query: ListStatusesParams): Promise<ListStatusesResult> {
    const { items, total } = await this.status_repository.list(query);
    return {
      items,
      total,
      page: query.page,
      limit: query.limit,
    };
  }
}
