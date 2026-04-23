import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';

/**
 * Catálogo de códigos de permiso. La asignación a usuarios es siempre indirecta:
 * `roles` → `role_permissions` → `permissions`. No enlazar permisos a usuarios fuera del rol.
 */
@Entity({ name: 'permissions', schema: 'transversal_schema' })
export class PermissionEntity extends BaseExternalIdEntity {
  @Column({ name: 'code', type: 'varchar', length: 120, unique: true })
  code: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;
}
