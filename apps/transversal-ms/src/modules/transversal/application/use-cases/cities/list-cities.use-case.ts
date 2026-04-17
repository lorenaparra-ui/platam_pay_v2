import { Inject, Injectable } from '@nestjs/common';
import { CITY_REPOSITORY } from '@modules/transversal/transversal.tokens';
import type { CityRepository } from '@modules/transversal/domain/ports/catalog/city.repository.port';
import type { City, ListCitiesParams } from '@modules/transversal/domain/models/city.models';

export interface ListCitiesResult {
  items: City[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class ListCitiesUseCase {
  constructor(
    @Inject(CITY_REPOSITORY)
    private readonly city_repository: CityRepository,
  ) {}

  async execute(query: ListCitiesParams): Promise<ListCitiesResult> {
    const { items, total } = await this.city_repository.list(query);
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
