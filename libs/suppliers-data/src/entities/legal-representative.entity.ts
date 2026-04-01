import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { PersonEntity } from '../../../transversal-data/src/entities/person.entity';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity({ name: 'legal_representatives', schema: 'suppliers_schema' })
export class LegalRepresentativeEntity extends BaseExternalIdEntity {
  @ManyToOne(() => PersonEntity, { nullable: false })
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity;

  @RelationId((lr: LegalRepresentativeEntity) => lr.person)
  personId: number;

  @Column({ name: 'is_primary', type: 'boolean', default: true })
  isPrimary: boolean;
}
