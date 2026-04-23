import { Inject, Injectable } from '@nestjs/common';
import { CITY_REPOSITORY } from '@modules/transversal/transversal.tokens';
import type { CityRepository } from '@modules/transversal/domain/ports/catalog/city.repository.port';
import type {
  CountryCatalogEntry,
  ListDistinctCountriesParams,
} from '@modules/transversal/domain/models/city.models';

@Injectable()
export class ListDistinctCountriesUseCase {
  constructor(
    @Inject(CITY_REPOSITORY)
    private readonly city_repository: CityRepository,
  ) {}

  async execute(
    params: ListDistinctCountriesParams,
  ): Promise<CountryCatalogEntry[]> {
    return this.city_repository.list_distinct_countries(params);
  }
}
