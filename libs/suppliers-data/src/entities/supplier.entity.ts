import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { BankAccountEntity } from './bank-account.entity';
import { BusinessEntity } from './business.entity';
import { PartnerEntity } from './partner.entity';
import { SupplierState } from '@platam/shared';

@Entity({ name: 'suppliers', schema: 'suppliers_schema' })
export class SupplierEntity extends BaseExternalIdEntity {
  @OneToOne(() => BusinessEntity, { nullable: false })
  @JoinColumn({ name: 'business_id', referencedColumnName: 'id' })
  business: BusinessEntity;

  @RelationId((s: SupplierEntity) => s.business)
  businessId: number;

  @OneToOne(() => BankAccountEntity, { nullable: true })
  @JoinColumn({ name: 'bank_account_id' })
  bankAccount: BankAccountEntity | null;

  @OneToOne(() => PartnerEntity, (p) => p.supplier)
  partner: PartnerEntity | null;

  @Column({
    name: 'state',
    type: 'enum',
    enum: SupplierState,
    default: SupplierState.ACTIVE,
  })
  state: SupplierState;
}
