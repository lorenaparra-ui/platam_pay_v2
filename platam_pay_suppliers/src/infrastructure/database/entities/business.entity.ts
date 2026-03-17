import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity('businesses')
export class BusinessEntity extends BaseExternalIdEntity {
  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

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
