import type { Role } from '@modules/transversal/catalog/domain/models/role.models';
import type { City } from '@modules/transversal/catalog/domain/models/city.models';
import type { CatalogStatus } from '@modules/transversal/catalog/domain/models/status.models';
import type { RoleResponseDto } from '../dto/roles.api.dto';
import type { CityResponseDto } from '../dto/cities.api.dto';
import type { StatusResponseDto } from '../dto/statuses.api.dto';

export function to_role_response_dto(role: Role): RoleResponseDto {
  return {
    external_id: role.external_id,
    name: role.name,
    description: role.description,
    created_at: role.created_at,
    updated_at: role.updated_at,
  };
}

export function to_city_response_dto(city: City): CityResponseDto {
  return {
    external_id: city.external_id,
    country_name: city.country_name,
    country_code: city.country_code,
    state_name: city.state_name,
    state_code: city.state_code,
    city_name: city.city_name,
    currency_external_id: city.currency_external_id,
    created_at: city.created_at,
    updated_at: city.updated_at,
  };
}

export function to_status_response_dto(row: CatalogStatus): StatusResponseDto {
  return {
    external_id: row.external_id,
    entity_type: row.entity_type,
    code: row.code,
    display_name: row.display_name,
    description: row.description,
    is_active: row.is_active,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
