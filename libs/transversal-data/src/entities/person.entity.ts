import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';
import { DocTypes } from '@platam/shared';
import { CityEntity } from './city.entity';

@Entity({ name: 'persons', schema: 'transversal_schema' })
export class PersonEntity extends BaseExternalIdEntity {
  
  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName: string;

  @Column({
    name: 'doc_type',
    type: 'enum',
    enum: DocTypes,
    enumName: 'persons_doc_type_enum',
  })
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

  @Column({ name: 'email', type: 'varchar', length: 320, unique: true, nullable: true })
  email: string | null;

  @Column({ name: 'residential_address', type: 'text', nullable: true })
  residentialAddress: string | null;


  @OneToOne(() => CityEntity, { nullable: false })
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city: CityEntity;

  @RelationId((p: PersonEntity) => p.city)
  cityId: number;

  /**
   * FK opcional a `suppliers_schema.bank_accounts` (migración 197).
   * Sin relación TypeORM hacia `BankAccountEntity` para no exigir esa entidad en el
   * registro de `transversal-ms` / `TRANSVERSAL_DATA_ENTITIES` (evita metadata huérfana).
   */
  @Column({ name: 'bank_account_id', type: 'bigint', nullable: true })
  bankAccountId: number | null;
}
