import { Column, Entity, Index } from 'typeorm';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';

@Entity({ name: 'role_permissions', schema: 'transversal_schema' })
@Index(['roleId', 'permissionId'], { unique: true })
export class RolePermissionEntity extends BaseExternalIdEntity {
  @Column({ name: 'role_id', type: 'bigint' })
  roleId: number;

  @Column({ name: 'permission_id', type: 'bigint' })
  permissionId: number;
}
