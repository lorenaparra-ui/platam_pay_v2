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
} from '@modules/transversal/catalog.tokens';
import type { CityRepository } from '@modules/transversal/catalog/domain/ports/city.repository.port';
import type { CurrencyReadPort } from '@modules/transversal/catalog/domain/ports/currency.read.port';
import type { City, UpdateCityProps } from '@modules/transversal/catalog/domain/models/city.models';
import { is_pg_unique_violation } from '@common/utils/pg-error.util';

export interface UpdateCityPayload {
  country_name?: string;
  country_code?: string;
  state_name?: string;
  state_code?: string | null;
  city_name?: string;
  currency_external_id?: string;
}

@Injectable()
export class UpdateCityByExternalIdUseCase {
  private readonly logger = new Logger(UpdateCityByExternalIdUseCase.name);

  constructor(
    @Inject(CITY_REPOSITORY)
    private readonly city_repository: CityRepository,
    @Inject(CURRENCY_READ_PORT)
    private readonly currency_read: CurrencyReadPort,
  ) {}

  async execute(
    external_id: string,
    body: UpdateCityPayload,
  ): Promise<City> {
    const patch: UpdateCityProps = {};
    if (body.country_name !== undefined) {
      patch.country_name = body.country_name;
    }
    if (body.country_code !== undefined) {
      patch.country_code = body.country_code;
    }
    if (body.state_name !== undefined) {
      patch.state_name = body.state_name;
    }
    if (body.state_code !== undefined) {
      patch.state_code = body.state_code;
    }
    if (body.city_name !== undefined) {
      patch.city_name = body.city_name;
    }
    if (body.currency_external_id !== undefined) {
      const currency_id =
        await this.currency_read.find_internal_id_by_external_id(
          body.currency_external_id,
        );
      if (currency_id === null) {
        throw new NotFoundException('currency not found');
      }
      patch.currency_id = currency_id;
    }
    try {
      const updated = await this.city_repository.update_by_external_id(
        external_id,
        patch,
      );
      if (updated === null) {
        throw new NotFoundException('city not found');
      }
      return updated;
    } catch (err: unknown) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      if (is_pg_unique_violation(err)) {
        throw new ConflictException('city already exists for this location');
      }
      this.logger.error('update city failed');
      throw err;
    }
  }
}
