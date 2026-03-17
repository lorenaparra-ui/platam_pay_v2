import { RolePermission } from '@users/domain/models/role-permission.model';
import { RolePermissionEntity } from '../entities/role-permission.entity';

export class RolePermissionMapper {
  static toDomain(entity: RolePermissionEntity): RolePermission {
    return new RolePermission(
      Number(entity.id),
      entity.externalId,
      Number(entity.roleId),
      Number(entity.permissionId),
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toEntity(domain: RolePermission): RolePermissionEntity {
    const entity = new RolePermissionEntity();
    entity.id = domain.id;
    entity.roleId = domain.roleId;
    entity.permissionId = domain.permissionId;
    return entity;
  }
}
