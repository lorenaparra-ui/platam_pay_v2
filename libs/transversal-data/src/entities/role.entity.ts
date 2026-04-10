import { Column, Entity } from 'typeorm';
import { Roles } from '@platam/shared';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';
/**
 * Rol RBAC: única vía para agrupar permisos (`role_permissions` → `permissions`).
 */
@Entity({ name: 'roles', schema: 'transversal_schema' })
export class RoleEntity extends BaseExternalIdEntity {
  @Column({ name: 'name', type: 'varchar', length: 80, unique: true })
  name: Roles;
  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;
}
