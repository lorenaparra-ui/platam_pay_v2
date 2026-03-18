import { Permission } from '@users/domain/models/permission.model';
import { PermissionEntity } from '@libs/database';

export class PermissionMapper {
  static toDomain(entity: PermissionEntity): Permission {
    return new Permission(
      Number(entity.id),
      entity.externalId,
      entity.code,
      entity.description,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toEntity(domain: Permission): PermissionEntity {
    const entity = new PermissionEntity();
    entity.id = domain.id;
    entity.code = domain.code;
    entity.description = domain.description;
    return entity;
  }
}
