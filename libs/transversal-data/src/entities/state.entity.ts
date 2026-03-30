import { Column, Entity, Index } from 'typeorm';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';

@Entity({ name: 'states', schema: 'transversal_schema' })
@Index(['countryCode', 'stateName'], { unique: true })
export class StateEntity extends BaseExternalIdEntity {
  @Column({ name: 'country_code', type: 'varchar', length: 2 })
  countryCode: string;

  @Column({ name: 'state_name', type: 'varchar', length: 120 })
  stateName: string;

  @Column({ name: 'state_code', type: 'varchar', length: 3, nullable: true })
  stateCode: string | null;
}
