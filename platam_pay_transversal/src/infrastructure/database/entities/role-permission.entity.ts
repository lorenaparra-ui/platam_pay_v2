import { Column, Entity, Index } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity('role_permissions')
@Index(['roleId', 'permissionId'], { unique: true })
export class RolePermissionEntity extends BaseExternalIdEntity {
  @Column({ name: 'role_id', type: 'bigint' })
  roleId: number;

  @Column({ name: 'permission_id', type: 'bigint' })
  permissionId: number;
}
