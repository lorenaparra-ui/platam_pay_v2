import type { Role } from '@modules/transversal/domain/models/role.models';
import type { City } from '@modules/transversal/domain/models/city.models';
import type { CatalogStatus } from '@modules/transversal/domain/models/status.models';
import type { RoleResponseDto } from '../dto/roles.api.dto';
import type { CityResponseDto } from '../dto/cities.api.dto';
import type { StatusResponseDto } from '../dto/statuses.api.dto';

export function to_role_response_dto(role: Role): RoleResponseDto {
  return {
    externalId: role.external_id,
    name: role.name,
    description: role.description,
    createdAt: role.created_at,
    updatedAt: role.updated_at,
  };
}

export function to_city_response_dto(city: City): CityResponseDto {
  return {
    externalId: city.external_id,
    countryName: city.country_name,
    countryCode: city.country_code,
    stateName: city.state_name,
    stateCode: city.state_code,
    cityName: city.city_name,
    currencyExternalId: city.currency_external_id,
    createdAt: city.created_at,
    updatedAt: city.updated_at,
  };
}

export function to_status_response_dto(row: CatalogStatus): StatusResponseDto {
  return {
    externalId: row.external_id,
    entityType: row.entity_type,
    code: row.code,
    displayName: row.display_name,
    description: row.description,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
