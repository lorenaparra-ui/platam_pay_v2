import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import {
  LoanRequestChannel,
  LoanRequestProductType,
  LoanRequestStatus,
  ModalityTypes,
} from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { CategoryEntity } from './category.entity';
import { CreditFacilityEntity } from './credit-facility.entity';
import {
  PartnerEntity,
  SalesRepresentativeEntity,
  SupplierEntity,
} from '@app/suppliers-data';

@Entity({ name: 'loan_requests', schema: 'products_schema' })
@Index('IDX_loan_requests_credit_facility_id', ['creditFacility'])
@Index('IDX_loan_requests_status', ['status'])
@Index('IDX_loan_requests_partner_id', ['partner'])
export class LoanRequestEntity extends BaseExternalIdEntity {
  @ManyToOne(() => CreditFacilityEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'credit_facility_id', referencedColumnName: 'id' })
  creditFacility: CreditFacilityEntity;

  @RelationId((r: LoanRequestEntity) => r.creditFacility)
  creditFacilityId: number;

  @ManyToOne(() => CategoryEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: CategoryEntity;

  @RelationId((r: LoanRequestEntity) => r.category)
  categoryId: number;

  @ManyToOne(() => PartnerEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'partner_id', referencedColumnName: 'id' })
  partner: PartnerEntity | null;

  @RelationId((r: LoanRequestEntity) => r.partner)
  partnerId: number | null;

  @ManyToOne(() => SupplierEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'supplier_id', referencedColumnName: 'id' })
  supplier: SupplierEntity | null;

  @RelationId((r: LoanRequestEntity) => r.supplier)
  supplierId: number | null;

  @ManyToOne(() => SalesRepresentativeEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'sales_representative_id', referencedColumnName: 'id' })
  salesRepresentative: SalesRepresentativeEntity | null;

  @RelationId((r: LoanRequestEntity) => r.salesRepresentative)
  salesRepresentativeId: number | null;

  @Column({
    name: 'product_type',
    type: 'enum',
    enum: LoanRequestProductType,
    enumName: 'loan_request_product_type',
  })
  productType: LoanRequestProductType;

  @Column({
    name: 'loan_modality',
    type: 'enum',
    enum: ModalityTypes,
    enumName: 'loan_request_modality',
  })
  loanModality: ModalityTypes;

  @Column({
    name: 'channel',
    type: 'enum',
    enum: LoanRequestChannel,
    enumName: 'loan_request_channel',
  })
  channel: LoanRequestChannel;

  @Column({ name: 'order_reference', type: 'varchar', length: 255, nullable: true })
  orderReference: string | null;

  @Column({
    name: 'requested_amount',
    type: 'decimal',
    precision: 18,
    scale: 4,
  })
  requestedAmount: string;

  @Column({
    name: 'confirmed_amount',
    type: 'decimal',
    precision: 18,
    scale: 4,
    nullable: true,
  })
  confirmedAmount: string | null;

  @Column({ name: 'installment_count', type: 'int', nullable: true })
  installmentCount: number | null;

  @Column({
    name: 'initial_payment_amount',
    type: 'decimal',
    precision: 18,
    scale: 4,
    nullable: true,
  })
  initialPaymentAmount: string | null;

  @Column({
    name: 'initial_payment_paid',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  initialPaymentPaid: boolean;

  @Column({
    name: 'requires_client_approval',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  requiresClientApproval: boolean;

  @Column({ name: 'client_approved_at', type: 'timestamptz', nullable: true })
  clientApprovedAt: Date | null;

  @Column({ name: 'client_rejection_reason', type: 'text', nullable: true })
  clientRejectionReason: string | null;

  @Column({ name: 'partner_confirmed_at', type: 'timestamptz', nullable: true })
  partnerConfirmedAt: Date | null;

  @Column({ name: 'partner_rejection_reason', type: 'text', nullable: true })
  partnerRejectionReason: string | null;

  @Column({ name: 'invoice_url', type: 'text', nullable: true })
  invoiceUrl: string | null;

  @Column({
    name: 'notes',
    type: 'text',
    array: true,
    nullable: true,
  })
  notes: string[] | null;

  @Column({
    name: 'status',
    type: 'enum',
    enum: LoanRequestStatus,
    enumName: 'loan_request_status',
    default: LoanRequestStatus.DRAFT,
  })
  status: LoanRequestStatus;
}
