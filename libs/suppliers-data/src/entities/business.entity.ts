import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { PersonEntity } from '../../../transversal-data/src/entities/person.entity';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { BusinessSeniorityEntity } from './business-seniority.entity';

@Entity({ name: 'businesses', schema: 'suppliers_schema' })
export class BusinessEntity extends BaseExternalIdEntity {
  @ManyToOne(() => PersonEntity, { nullable: false })
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity;

  @RelationId((b: BusinessEntity) => b.person)
  personId: number;

  @ManyToOne(() => BusinessSeniorityEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'business_seniority_id', referencedColumnName: 'id' })
  businessSeniority: BusinessSeniorityEntity | null;

  @RelationId((b: BusinessEntity) => b.businessSeniority)
  businessSeniorityId: number | null;

  @Column({ name: 'city_id', type: 'bigint', nullable: true })
  cityId: number | null;

  @Column({ name: 'entity_type', type: 'varchar', length: 10 })
  entityType: string;

  @Column({ name: 'business_name', type: 'varchar', length: 255, nullable: true })
  businessName: string | null;

  @Column({ name: 'business_address', type: 'text', nullable: true })
  businessAddress: string | null;

  @Column({ name: 'business_type', type: 'varchar', length: 10, nullable: true })
  businessType: string | null;

  @Column({ name: 'relationship_to_business', type: 'varchar', length: 100, nullable: true })
  relationshipToBusiness: string | null;

  @Column({ name: 'legal_name', type: 'varchar', length: 255, nullable: true })
  legalName: string | null;

  @Column({ name: 'trade_name', type: 'varchar', length: 255, nullable: true })
  tradeName: string | null;

  @Column({ name: 'tax_id', type: 'varchar', length: 50, unique: true, nullable: true })
  taxId: string | null;

  @Column({ name: 'year_of_establishment', type: 'int', nullable: true })
  yearOfEstablishment: number | null;
}
