import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { DISBURSEMENT_SCHEMA } from '../disbursement-schema.constants';
import { LoanEntity } from './loan.entity';
import { PaymentEntity } from './payment.entity';

@Entity({ name: 'payment_allocations', schema: DISBURSEMENT_SCHEMA })
@Index('IDX_payment_allocations_payment_id', ['payment'])
@Index('IDX_payment_allocations_loan_id', ['loan'])
export class PaymentAllocationEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    name: 'external_id',
    type: 'uuid',
    unique: true,
    insert: false,
    update: false,
  })
  externalId: string;

  @ManyToOne(() => PaymentEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'payment_id', referencedColumnName: 'id' })
  payment: PaymentEntity;

  @RelationId((p: PaymentAllocationEntity) => p.payment)
  paymentId: number;

  @ManyToOne(() => LoanEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'loan_id', referencedColumnName: 'id' })
  loan: LoanEntity;

  @RelationId((p: PaymentAllocationEntity) => p.loan)
  loanId: number;

  @Column({
    name: 'allocated_amount',
    type: 'decimal',
    precision: 18,
    scale: 4,
  })
  allocatedAmount: string;

  @Column({
    name: 'principal_allocated',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: '0',
  })
  principalAllocated: string;

  @Column({
    name: 'current_interest_allocated',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: '0',
  })
  currentInterestAllocated: string;

  @Column({
    name: 'overdue_interest_allocated',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: '0',
  })
  overdueInterestAllocated: string;

  @Column({
    name: 'mora_interest_allocated',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: '0',
  })
  moraInterestAllocated: string;

  @Column({
    name: 'fees_allocated',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: '0',
  })
  feesAllocated: string;

  @Column({
    name: 'iva_allocated',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: '0',
  })
  ivaAllocated: string;

  @Column({ name: 'loan_status_after', type: 'varchar', length: 15 })
  loanStatusAfter: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    insert: false,
    update: false,
  })
  createdAt: Date;
}
