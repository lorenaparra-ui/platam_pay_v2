import { Column, Entity, Index } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity('statuses')
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
}
