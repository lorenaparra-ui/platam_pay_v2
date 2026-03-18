import { StatusEntity } from '@libs/database';
import { Status } from '../../../modules/transversal/domain/models/status.model';

export class StatusMapper {
  static toDomain(entity: StatusEntity): Status {
    return new Status(
      Number(entity.id),
      entity.externalId,
      entity.entityType,
      entity.code,
      entity.displayName,
      entity.description,
      entity.isActive,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toEntity(domain: Status): StatusEntity {
    const entity = new StatusEntity();
    entity.id = domain.id;
    entity.entityType = domain.entityType;
    entity.code = domain.code;
    entity.displayName = domain.displayName;
    entity.description = domain.description;
    entity.isActive = domain.isActive;
    return entity;
  }
}
