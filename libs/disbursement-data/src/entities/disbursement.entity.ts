import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { DisbursementStatus, DisbursementType } from '@platam/shared';
import { DISBURSEMENT_SCHEMA } from '../disbursement-schema.constants';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { DisbursementBatchEntity } from './disbursement-batch.entity';

@Index('idx_disbursements_batch_id', ['batch'])
@Index('idx_disbursements_loan_id', ['loanId'])
@Index('idx_disbursements_status', ['status'])
@Entity({ name: 'disbursements', schema: DISBURSEMENT_SCHEMA })
export class DisbursementEntity extends BaseExternalIdEntity {
  @Column({
    name: 'disbursement_type',
    type: 'enum',
    enum: DisbursementType,
    enumName: 'disbursement_type',
  })
  disbursementType: DisbursementType;

  @Column({ name: 'loan_id', type: 'bigint', nullable: true })
  loanId: number | null;

  @Column({ name: 'loan_request_id', type: 'bigint', nullable: true })
  loanRequestId: number | null;

  @Column({ name: 'partner_id', type: 'bigint', nullable: true })
  partnerId: number | null;

  @Column({ name: 'supplier_id', type: 'bigint', nullable: true })
  supplierId: number | null;

  @Column({ name: 'bank_account_id', type: 'bigint' })
  bankAccountId: number;

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 18,
    scale: 4,
  })
  amount: string;

  @ManyToOne(() => DisbursementBatchEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'batch_id', referencedColumnName: 'id' })
  batch: DisbursementBatchEntity | null;

  @RelationId((d: DisbursementEntity) => d.batch)
  batchId: number | null;

  @Column({
    name: 'status',
    type: 'enum',
    enum: DisbursementStatus,
    enumName: 'disbursement_status',
    default: DisbursementStatus.PENDING,
  })
  status: DisbursementStatus;

  @Column({ name: 'disbursed_at', type: 'timestamptz', nullable: true })
  disbursedAt: Date | null;

  @Column({ name: 'failure_reason', type: 'text', nullable: true })
  failureReason: string | null;

  @Column({ name: 'voucher_url', type: 'text', nullable: true })
  voucherUrl: string | null;
}
