import { Inject, Injectable } from '@nestjs/common';
import type { CityRepositoryPort } from '../../domain/ports/city.repository.port';
import { CITY_REPOSITORY } from '../../domain/ports/city.repository.port';
import { CityResponseDto } from '../dto/city-response.dto';
import { CountryResponseDto } from '../dto/country-response.dto';

@Injectable()
export class GetCitiesUseCase {
  constructor(
    @Inject(CITY_REPOSITORY)
    private readonly repository: CityRepositoryPort,
  ) {}

  async execute(): Promise<CityResponseDto[]> {
    const models = await this.repository.findAll();
    return models.map(CityResponseDto.fromDomain);
  }

  async executeByExternalId(externalId: string): Promise<CityResponseDto | null> {
    const model = await this.repository.findByExternalId(externalId);
    return model ? CityResponseDto.fromDomain(model) : null;
  }

  async executeByCountryCode(countryCode: string): Promise<CityResponseDto[]> {
    const models = await this.repository.findByCountryCode(countryCode);
    return models.map(CityResponseDto.fromDomain);
  }

  async executeByCountryAndState(
    countryCode: string,
    stateName: string,
  ): Promise<CityResponseDto[]> {
    const models = await this.repository.findByCountryAndState(countryCode, stateName);
    return models.map(CityResponseDto.fromDomain);
  }

  async executeCountries(): Promise<CountryResponseDto[]> {
    const countries = await this.repository.findDistinctCountries();
    return countries.map((c) => CountryResponseDto.from(c.countryCode, c.countryName));
  }
}
