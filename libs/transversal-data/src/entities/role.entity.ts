import { Column, Entity } from 'typeorm';
import { Roles } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';

/**
 * Rol RBAC: única vía para agrupar permisos (`role_permissions` → `permissions`).
 */
@Entity({ name: 'roles', schema: 'transversal_schema' })
export class RoleEntity extends BaseExternalIdEntity {
  @Column({
    name: 'name',
    type: 'enum',
    enum: Roles,
    enumName: 'roles_name',
    unique: true,
  })
  name: Roles;
  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;
}
