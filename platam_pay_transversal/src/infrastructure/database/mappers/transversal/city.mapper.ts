import { CityEntity } from '@libs/database';
import { City } from '../../../modules/transversal/domain/models/city.model';

export class CityMapper {
  static toDomain(entity: CityEntity): City {
    return new City(
      Number(entity.id),
      entity.externalId,
      entity.countryName,
      entity.countryCode,
      entity.stateName,
      entity.stateCode,
      entity.cityName,
      Number(entity.currencyId),
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toEntity(domain: City): CityEntity {
    const entity = new CityEntity();
    entity.id = domain.id;
    entity.countryName = domain.countryName;
    entity.countryCode = domain.countryCode;
    entity.stateName = domain.stateName;
    entity.stateCode = domain.stateCode;
    entity.cityName = domain.cityName;
    entity.currencyId = domain.currencyId;
    return entity;
  }
}
