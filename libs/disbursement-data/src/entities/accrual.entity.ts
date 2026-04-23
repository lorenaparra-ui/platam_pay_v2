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

@Entity({ name: 'accruals', schema: DISBURSEMENT_SCHEMA })
@Index('UQ_accruals_loan_id_calculation_date', ['loan', 'calculationDate'], {
  unique: true,
})
@Index('IDX_accruals_calculation_date', ['calculationDate'])
export class AccrualEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => LoanEntity, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'loan_id', referencedColumnName: 'id' })
  loan: LoanEntity;

  @RelationId((a: AccrualEntity) => a.loan)
  loanId: number;

  @Column({ name: 'calculation_date', type: 'date' })
  calculationDate: string;

  @Column({
    name: 'balance_principal_overdue',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: '0',
  })
  balancePrincipalOverdue: string;

  @Column({
    name: 'daily_interest_current',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: '0',
  })
  dailyInterestCurrent: string;

  @Column({
    name: 'daily_interest_mora',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: '0',
  })
  dailyInterestMora: string;

  @Column({
    name: 'daily_fees',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: '0',
  })
  dailyFees: string;

  @Column({ name: 'status_after', type: 'varchar', length: 15 })
  statusAfter: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    insert: false,
    update: false,
  })
  createdAt: Date;
}
