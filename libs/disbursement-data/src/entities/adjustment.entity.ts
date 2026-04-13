import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { AdjustmentsStatus, AdjustmentsType } from '@platam/shared';
import { UserEntity } from '@app/transversal-data';
import { PartnerEntity } from '@app/suppliers-data';
import { DISBURSEMENT_SCHEMA } from '../disbursement-schema.constants';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { DisbursementBatchEntity } from './disbursement-batch.entity';
import { LoanEntity } from './loan.entity';

@Entity({ name: 'adjustments', schema: DISBURSEMENT_SCHEMA })
export class AdjustmentEntity extends BaseExternalIdEntity {
  @ManyToOne(() => LoanEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'loan_id', referencedColumnName: 'id' })
  loan: LoanEntity;

  @RelationId((a: AdjustmentEntity) => a.loan)
  loanId: number;

  @ManyToOne(() => PartnerEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'partner_id', referencedColumnName: 'id' })
  partner: PartnerEntity;

  @RelationId((a: AdjustmentEntity) => a.partner)
  partnerId: number;

  @ManyToOne(() => DisbursementBatchEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'disbursement_batch_id', referencedColumnName: 'id' })
  disbursementBatch: DisbursementBatchEntity | null;

  @RelationId((a: AdjustmentEntity) => a.disbursementBatch)
  disbursementBatchId: number | null;

  @Column({
    name: 'adjustment_type',
    type: 'enum',
    enum: AdjustmentsType,
    enumName: 'adjustments_type',
  })
  adjustmentType: AdjustmentsType;

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 18,
    scale: 4,
  })
  amount: string;

  @Column({ name: 'event_date', type: 'date' })
  eventDate: string;

  @Column({
    name: 'affects_loan_balance',
    type: 'boolean',
    default: false,
  })
  affectsLoanBalance: boolean;

  @Column({ name: 'notes', type: 'text', array: true, nullable: true })
  notes: string[] | null;

  @Column({
    name: 'status',
    type: 'enum',
    enum: AdjustmentsStatus,
    enumName: 'adjustments_status',
    default: AdjustmentsStatus.PENDING,
  })
  status: AdjustmentsStatus;

  @Column({ name: 'applied_at', type: 'timestamptz', nullable: true })
  appliedAt: Date | null;

  @ManyToOne(() => UserEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  createdBy: UserEntity;

  @RelationId((a: AdjustmentEntity) => a.createdBy)
  createdById: number;
}
