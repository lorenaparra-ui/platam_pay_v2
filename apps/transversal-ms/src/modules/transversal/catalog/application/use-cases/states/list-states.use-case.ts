import { Inject, Injectable } from '@nestjs/common';
import { STATE_REPOSITORY } from '@modules/transversal/catalog.tokens';
import type { StateRepository } from '@modules/transversal/catalog/domain/ports/state.repository.port';
import type { State, ListStatesParams } from '@modules/transversal/catalog/domain/models/state.models';

export interface ListStatesResult {
  items: State[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class ListStatesUseCase {
  constructor(
    @Inject(STATE_REPOSITORY)
    private readonly state_repository: StateRepository,
  ) {}

  async execute(query: ListStatesParams): Promise<ListStatesResult> {
    const { items, total } = await this.state_repository.list(query);
    return {
      items,
      total,
      page: query.page,
      limit: query.limit,
    };
  }
}
