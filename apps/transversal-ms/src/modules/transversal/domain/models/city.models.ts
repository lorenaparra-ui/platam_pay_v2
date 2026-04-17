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
  /** Si ambos faltan, se devuelven todas las filas que cumplan filtros. */
  page?: number;
  limit?: number;
  country_code?: string;
  state_name?: string;
  city_name_contains?: string;
}

/** País deduplicado a partir del catálogo de ciudades. */
export interface CountryCatalogEntry {
  country_name: string;
  country_code: string;
}

export interface ListDistinctCountriesParams {
  /** Filtro opcional por subcadena del nombre del país (insensible a mayúsculas). */
  country_name_contains?: string;
}
