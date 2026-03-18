import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity('permissions')
export class PermissionEntity extends BaseExternalIdEntity {
  @Column({ name: 'code', type: 'varchar', length: 120, unique: true })
  code: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;
}
