export interface City {
  id: number;
  external_id: string;
  country_name: string;
  country_code: string;
  state_name: string;
  state_code: string | null;
  city_name: string;
  currency_id: number;
  currency_external_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCityProps {
  country_name: string;
  country_code: string;
  state_name: string;
  state_code: string | null;
  city_name: string;
  currency_id: number;
}

export interface UpdateCityProps {
  country_name?: string;
  country_code?: string;
  state_name?: string;
  state_code?: string | null;
  city_name?: string;
  currency_id?: number;
}

export interface ListCitiesParams {
  page: number;
  limit: number;
  country_code?: string;
  state_name?: string;
  city_name_contains?: string;
}
