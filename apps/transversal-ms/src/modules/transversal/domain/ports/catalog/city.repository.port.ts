import type {
  City,
  CreateCityProps,
  UpdateCityProps,
  ListCitiesParams,
} from '../../../domain/models/city.models';

export interface CityRepository {
  find_by_external_id(external_id: string): Promise<City | null>;

  find_by_internal_id(internal_id: number): Promise<City | null>;

  list(params: ListCitiesParams): Promise<{ items: City[]; total: number }>;

  create(props: CreateCityProps): Promise<City>;

  update_by_external_id(
    external_id: string,
    patch: UpdateCityProps,
  ): Promise<City | null>;

  delete_by_external_id(external_id: string): Promise<boolean>;
}
