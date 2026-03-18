import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity('business_seniority')
export class BusinessSeniorityEntity extends BaseExternalIdEntity {
  @Column({ name: 'description', type: 'varchar', length: 100 })
  description: string;

  @Column({ name: 'range_start', type: 'int' })
  rangeStart: number;

  @Column({ name: 'range_end', type: 'int' })
  rangeEnd: number;
}