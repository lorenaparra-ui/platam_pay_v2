import { BusinessSeniorityEntity } from '@libs/database';
import { BusinessSeniority } from '../../../modules/transversal/domain/models/business-seniority.model';

export class BusinessSeniorityMapper {
  static toDomain(entity: BusinessSeniorityEntity): BusinessSeniority {
    return new BusinessSeniority(
      entity.id,
      entity.externalId,
      entity.description,
      entity.rangeStart,
      entity.rangeEnd,
    );
  }

  static toEntity(domain: BusinessSeniority): BusinessSeniorityEntity {
    const entity = new BusinessSeniorityEntity();
    entity.id = domain.id;
    entity.description = domain.description;
    entity.rangeStart = domain.rangeStart;
    entity.rangeEnd = domain.rangeEnd;
    return entity;
  }
}