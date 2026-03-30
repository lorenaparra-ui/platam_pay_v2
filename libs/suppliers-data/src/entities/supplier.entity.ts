import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { BankAccountEntity } from './bank-account.entity';

@Entity({ name: 'suppliers', schema: 'suppliers_schema' })
export class SupplierEntity extends BaseExternalIdEntity {
  @Column({ name: 'business_id', type: 'bigint', unique: true })
  businessId: number;

  @OneToOne(() => BankAccountEntity, { nullable: true })
  @JoinColumn({ name: 'bank_account_id' })
  bankAccount: BankAccountEntity | null;
}
