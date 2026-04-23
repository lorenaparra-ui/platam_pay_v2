import { Inject, Injectable } from '@nestjs/common';
import { STATUS_REPOSITORY } from '@modules/transversal/transversal.tokens';
import type { StatusRepository } from '@modules/transversal/domain/ports/catalog/status.repository.port';
import type {
  CatalogStatus,
  ListStatusesParams,
} from '@modules/transversal/domain/models/status.models';

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
    const unpaged = query.page === undefined && query.limit === undefined;
    const page = unpaged ? 1 : (query.page ?? 1);
    const limit = unpaged ? total : (query.limit ?? 20);
    return {
      items,
      total,
      page,
      limit,
    };
  }
}
