import { City } from '../models/city.model';

export const CITY_REPOSITORY = 'CITY_REPOSITORY';

export interface CountryItem {
  countryCode: string;
  countryName: string;
}

export interface CityRepositoryPort {
  findAll(): Promise<City[]>;
  findById(id: number): Promise<City | null>;
  findByExternalId(externalId: string): Promise<City | null>;
  findByCountryCode(countryCode: string): Promise<City[]>;
  findByCountryAndState(countryCode: string, stateName: string): Promise<City[]>;
  findDistinctCountries(): Promise<CountryItem[]>;
}
