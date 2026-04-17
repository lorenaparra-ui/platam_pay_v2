import type {
  City,
  CountryCatalogEntry,
  CreateCityProps,
  ListCitiesParams,
  ListDistinctCountriesParams,
  UpdateCityProps,
} from '../../../domain/models/city.models';

export interface CityRepository {
  find_by_external_id(external_id: string): Promise<City | null>;

  find_by_internal_id(internal_id: number): Promise<City | null>;

  list(params: ListCitiesParams): Promise<{ items: City[]; total: number }>;

  list_distinct_countries(
    params: ListDistinctCountriesParams,
  ): Promise<CountryCatalogEntry[]>;

  create(props: CreateCityProps): Promise<City>;

  update_by_external_id(
    external_id: string,
    patch: UpdateCityProps,
  ): Promise<City | null>;

  delete_by_external_id(external_id: string): Promise<boolean>;
}
