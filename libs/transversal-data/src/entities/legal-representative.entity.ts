import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';

@Entity({ name: 'legal_representatives', schema: 'transversal_schema' })
export class LegalRepresentativeEntity extends BaseExternalIdEntity {
  @Column({ name: 'company_id', type: 'bigint' })
  companyId: number;

  @Column({ name: 'person_id', type: 'bigint' })
  personId: number;

  @Column({ name: 'is_primary', type: 'boolean', default: true })
  isPrimary: boolean;
}
