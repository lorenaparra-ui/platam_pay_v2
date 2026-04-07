import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';

@Entity({ name: 'persons', schema: 'transversal_schema' })
export class PersonEntity extends BaseExternalIdEntity {
  @Column({ name: 'country_code', type: 'varchar', length: 2, nullable: true })
  countryCode: string | null;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName: string;

  @Column({ name: 'doc_type', type: 'varchar', length: 100 })
  docType: string;

  @Column({ name: 'doc_number', type: 'varchar', unique: true })
  docNumber: string;

  @Column({ name: 'doc_issue_date', type: 'date', nullable: true })
  docIssueDate: Date | null;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate: Date | null;

  @Column({ name: 'gender', type: 'varchar', length: 20, nullable: true })
  gender: string | null;

  @Column({ name: 'phone', type: 'varchar', nullable: true })
  phone: string | null;

  @Column({ name: 'email', type: 'varchar', length: 320, nullable: true })
  email: string | null;

  @Column({ name: 'residential_address', type: 'text', nullable: true })
  residentialAddress: string | null;

  @Column({ name: 'business_address', type: 'text', nullable: true })
  businessAddress: string | null;

  @Column({ name: 'city_id', type: 'bigint', nullable: true })
  cityId: number | null;
}
