import { Entity } from 'typeorm';
import { DISBURSEMENT_SCHEMA } from '../disbursement-schema.constants';
import { BaseExternalIdEntity } from './base-external-id.entity';

/** Tabla mínima para FK desde `adjustments` y `payment_allocations`; ampliar cuando exista el modelo de préstamo. */
@Entity({ name: 'loans', schema: DISBURSEMENT_SCHEMA })
export class LoanEntity extends BaseExternalIdEntity {}
