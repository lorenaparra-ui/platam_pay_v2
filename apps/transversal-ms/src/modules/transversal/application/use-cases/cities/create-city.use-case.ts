import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  CITY_REPOSITORY,
  CURRENCY_READ_PORT,
} from '@modules/transversal/transversal.tokens';
import type { CityRepository } from '@modules/transversal/domain/ports/catalog/city.repository.port';
import type { CurrencyReadPort } from '@modules/transversal/domain/ports/catalog/currency.read.port';
import type { City } from '@modules/transversal/domain/models/city.models';
import { is_pg_unique_violation } from '@common/utils/pg-error.util';

export interface CreateCityPayload {
  country_name: string;
  country_code: string;
  state_name: string;
  state_code: string | null;
  city_name: string;
  currency_external_id: string;
}

@Injectable()
export class CreateCityUseCase {
  private readonly logger = new Logger(CreateCityUseCase.name);

  constructor(
    @Inject(CITY_REPOSITORY)
    private readonly city_repository: CityRepository,
    @Inject(CURRENCY_READ_PORT)
    private readonly currency_read: CurrencyReadPort,
  ) {}

  async execute(body: CreateCityPayload): Promise<City> {
    const currency_id =
      await this.currency_read.find_internal_id_by_external_id(
        body.currency_external_id,
      );
    if (currency_id === null) {
      throw new NotFoundException('currency not found');
    }
    try {
      return await this.city_repository.create({
        country_name: body.country_name,
        country_code: body.country_code,
        state_name: body.state_name,
        state_code: body.state_code,
        city_name: body.city_name,
        currency_id,
      });
    } catch (err: unknown) {
      if (is_pg_unique_violation(err)) {
        throw new ConflictException('city already exists for this location');
      }
      this.logger.error('create city failed');
      throw err;
    }
  }
}
