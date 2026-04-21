import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AsyncJobStatus, AsyncJobStep } from '@platam/shared';

export interface CreditApplicationJobPayload {
  partner_id: string;
  sales_rep_id: string;
  doc_number: string;
  doc_type: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string | null;
  city_id: string | null;
  birth_date: string | null;
  business_type: string;
  business_name: string | null;
  business_address: string | null;
  relationship_to_business: string | null;
  business_seniority: string | null;
  number_of_employees: number | null;
  number_of_locations: number | null;
  business_flagship_m2: number | null;
  business_has_rent: boolean | null;
  business_rent_amount: number | null;
  requested_credit_line: number;
  monthly_purchases: number | null;
  current_purchases: number | null;
  total_assets: number | null;
  monthly_income: number | null;
  monthly_expenses: number | null;
  privacy_policy_accepted: boolean;
}

export interface CreditApplicationJobResolvedIds {
  partner_internal_id?: number;
  sales_rep_internal_id?: number;
  city_internal_id?: number | null;
  person_internal_id?: number;
  person_external_id?: string;
  business_internal_id?: number;
  credit_application_external_id?: string;
}

@Index('IDX_credit_application_jobs_status', ['status'])
@Entity({ name: 'credit_application_jobs', schema: 'products_schema' })
export class CreditApplicationJobEntity {
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

  @Column({ name: 'status', type: 'varchar', length: 32, default: AsyncJobStatus.PENDING })
  status: AsyncJobStatus;

  @Column({ name: 'step', type: 'varchar', length: 64, default: AsyncJobStep.ENQUEUED })
  step: string;

  @Column({ name: 'payload', type: 'jsonb', default: '{}' })
  payload: CreditApplicationJobPayload;

  @Column({ name: 'resolved_ids', type: 'jsonb', default: '{}' })
  resolvedIds: CreditApplicationJobResolvedIds;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string | null;

  @Column({
    name: 'idempotency_key',
    type: 'varchar',
    length: 512,
    nullable: true,
    unique: true,
  })
  idempotencyKey: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', insert: false, update: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', insert: false, update: false })
  updatedAt: Date;
}
