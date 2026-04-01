import { Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { BankAccountEntity } from './bank-account.entity';
import { BusinessEntity } from './business.entity';
import { LegalRepresentativeEntity } from './legal-representative.entity';
import { PartnersEntity } from './partners.entity';

@Entity({ name: 'suppliers', schema: 'suppliers_schema' })
export class SupplierEntity extends BaseExternalIdEntity {
  @OneToOne(() => BusinessEntity, { nullable: false })
  @JoinColumn({ name: 'business_id', referencedColumnName: 'id' })
  business: BusinessEntity;

  @RelationId((s: SupplierEntity) => s.business)
  businessId: number;

  @OneToOne(() => LegalRepresentativeEntity, { nullable: true })
  @JoinColumn({ name: 'legal_representative_id', referencedColumnName: 'id' })
  legalRepresentative: LegalRepresentativeEntity | null;

  @RelationId((s: SupplierEntity) => s.legalRepresentative)
  legalRepresentativeId: number | null;

  @OneToOne(() => BankAccountEntity, { nullable: true })
  @JoinColumn({ name: 'bank_account_id' })
  bankAccount: BankAccountEntity | null;

  @OneToOne(() => PartnersEntity, (p) => p.supplier)
  partner: PartnersEntity | null;
}
