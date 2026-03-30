import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CITY_REPOSITORY } from '@modules/transversal/catalog.tokens';
import type { CityRepository } from '@modules/transversal/catalog/domain/ports/city.repository.port';

@Injectable()
export class DeleteCityByExternalIdUseCase {
  constructor(
    @Inject(CITY_REPOSITORY)
    private readonly city_repository: CityRepository,
  ) {}

  async execute(external_id: string): Promise<void> {
    const deleted = await this.city_repository.delete_by_external_id(
      external_id,
    );
    if (deleted) {
      return;
    }
    const exists = await this.city_repository.find_by_external_id(external_id);
    if (exists === null) {
      throw new NotFoundException('city not found');
    }
    throw new ConflictException('city is referenced by persons or businesses');
  }
}
