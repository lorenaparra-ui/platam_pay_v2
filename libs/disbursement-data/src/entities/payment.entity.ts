import { Entity } from 'typeorm';
import { DISBURSEMENT_SCHEMA } from '../disbursement-schema.constants';
import { BaseExternalIdEntity } from './base-external-id.entity';

/** Tabla mínima para FK desde `payment_allocations`; ampliar cuando exista el modelo de pagos. */
@Entity({ name: 'payments', schema: DISBURSEMENT_SCHEMA })
export class PaymentEntity extends BaseExternalIdEntity {}
