import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import {
  BatchType,
  DisbursementBatchesStatus,
  DisbursementType,
} from '@platam/shared';
import { UserEntity } from '@app/transversal-data';
import { PartnerEntity } from '@app/suppliers-data';
import { DISBURSEMENT_SCHEMA } from '../disbursement-schema.constants';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity({ name: 'disbursement_batches', schema: DISBURSEMENT_SCHEMA })
export class DisbursementBatchEntity extends BaseExternalIdEntity {
  @Column({
    name: 'disbursement_type',
    type: 'enum',
    enum: DisbursementType,
    enumName: 'disbursement_type',
  })
  disbursementType: DisbursementType;

  @ManyToOne(() => PartnerEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'partner_id', referencedColumnName: 'id' })
  partner: PartnerEntity;

  @RelationId((b: DisbursementBatchEntity) => b.partner)
  partnerId: number;

  @Column({
    name: 'batch_type',
    type: 'enum',
    enum: BatchType,
    enumName: 'batch_type',
  })
  batchType: BatchType;

  @Column({
    name: 'gross_amount',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: '0',
  })
  grossAmount: string;

  @Column({
    name: 'adjustments_amount',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: '0',
  })
  adjustmentsAmount: string;

  @Column({
    name: 'net_amount',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: '0',
  })
  netAmount: string;

  @Column({ name: 'total_count', type: 'int', default: 0 })
  totalCount: number;

  @Column({ name: 'success_count', type: 'int', default: 0 })
  successCount: number;

  @Column({ name: 'failed_count', type: 'int', default: 0 })
  failedCount: number;

  @Column({ name: 'file_url', type: 'text', nullable: true })
  fileUrl: string | null;

  @Column({ name: 'response_file_url', type: 'text', nullable: true })
  responseFileUrl: string | null;

  @Column({ name: 'voucher_url', type: 'text', nullable: true })
  voucherUrl: string | null;

  @Column({ name: 'disbursed_at', type: 'date', nullable: true })
  disbursedAt: string | null;

  @ManyToOne(() => UserEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'generated_by', referencedColumnName: 'id' })
  generatedBy: UserEntity;

  @RelationId((b: DisbursementBatchEntity) => b.generatedBy)
  generatedById: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: DisbursementBatchesStatus,
    enumName: 'disbursement_batches_status',
    default: DisbursementBatchesStatus.PENDING,
  })
  status: DisbursementBatchesStatus;
}
