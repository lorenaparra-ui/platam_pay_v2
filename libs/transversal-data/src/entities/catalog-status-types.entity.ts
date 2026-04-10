import { Column, Entity, Index } from 'typeorm';
import { CatalogActivationState } from '@platam/shared';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';

@Entity({ name: 'catalog_status_types', schema: 'transversal_schema' })
@Index(['entityType', 'code'], { unique: true })
export class StatusEntity extends BaseExternalIdEntity {
  @Column({ name: 'entity_type', type: 'varchar', length: 100 })
  entityType: string;

  @Column({ name: 'code', type: 'varchar', length: 50 })
  code: string;

  @Column({ name: 'display_name', type: 'varchar', length: 100 })
  displayName: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  /** Refleja `is_active` con tipo de dominio aislado (sin columna adicional). */
  get state(): CatalogActivationState {
    return this.isActive
      ? CatalogActivationState.ACTIVE
      : CatalogActivationState.INACTIVE;
  }

  set state(v: CatalogActivationState) {
    this.isActive = v === CatalogActivationState.ACTIVE;
  }
}
