import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';

@Entity({ name: 'roles', schema: 'transversal_schema' })
export class RoleEntity extends BaseExternalIdEntity {
  @Column({ name: 'name', type: 'varchar', length: 80, unique: true })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;
}
