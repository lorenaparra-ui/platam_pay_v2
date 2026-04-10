import { AccrualEntity } from './accrual.entity';
import { AdjustmentEntity } from './adjustment.entity';
import { DisbursementBatchEntity } from './disbursement-batch.entity';
import { DisbursementEntity } from './disbursement.entity';
import { LoanEntity } from './loan.entity';
import { PaymentAllocationEntity } from './payment-allocation.entity';
import { PaymentEntity } from './payment.entity';

/** Lista de entidades TypeORM en `disbursement_schema` (CLI migraciones + `DisbursementDataModule`). */
export const DISBURSEMENT_DATA_ENTITIES = [
  LoanEntity,
  PaymentEntity,
  DisbursementBatchEntity,
  AdjustmentEntity,
  PaymentAllocationEntity,
  AccrualEntity,
  DisbursementEntity,
] as const;
