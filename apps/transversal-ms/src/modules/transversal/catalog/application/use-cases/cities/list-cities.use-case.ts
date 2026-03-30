import { Inject, Injectable } from '@nestjs/common';
import { CITY_REPOSITORY } from '@modules/transversal/catalog.tokens';
import type { CityRepository } from '@modules/transversal/catalog/domain/ports/city.repository.port';
import type { City, ListCitiesParams } from '@modules/transversal/catalog/domain/models/city.models';

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
    return {
      items,
      total,
      page: query.page,
      limit: query.limit,
    };
  }
}
