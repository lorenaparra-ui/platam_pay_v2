import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CITY_REPOSITORY } from '@modules/transversal/transversal.tokens';
import type { CityRepository } from '@modules/transversal/domain/ports/catalog/city.repository.port';
import type { City } from '@modules/transversal/domain/models/city.models';

@Injectable()
export class GetCityByExternalIdUseCase {
  constructor(
    @Inject(CITY_REPOSITORY)
    private readonly city_repository: CityRepository,
  ) {}

  async execute(external_id: string): Promise<City> {
    const city = await this.city_repository.find_by_external_id(external_id);
    if (city === null) {
      throw new NotFoundException('city not found');
    }
    return city;
  }
}
