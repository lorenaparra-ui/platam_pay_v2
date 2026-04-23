import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { PersonEntity } from '../../../transversal-data/src/entities/person.entity';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { BusinessEntity } from './business.entity';

@Entity({ name: 'legal_representatives', schema: 'suppliers_schema' })
@Index('IDX_legal_representatives_business_id', ['business'])
@Index('IDX_legal_representatives_person_id', ['person'])
export class LegalRepresentativeEntity extends BaseExternalIdEntity {
  @ManyToOne(() => BusinessEntity, { nullable: false })
  @JoinColumn({ name: 'business_id', referencedColumnName: 'id' })
  business: BusinessEntity;

  @RelationId((lr: LegalRepresentativeEntity) => lr.business)
  businessId: number;

  @ManyToOne(() => PersonEntity, { nullable: false })
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity;

  @RelationId((lr: LegalRepresentativeEntity) => lr.person)
  personId: number;

  @Column({ name: 'is_primary', type: 'boolean', default: true })
  isPrimary: boolean;
}
