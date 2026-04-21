import type { AsyncJobStatus } from '@platam/shared';
import type {
  CreditApplicationJobPayload,
  CreditApplicationJobResolvedIds,
} from '@app/products-data';

export const CREDIT_APPLICATION_JOB_REPOSITORY = Symbol('CREDIT_APPLICATION_JOB_REPOSITORY');

export interface CreditApplicationJobRecord {
  id: number;
  externalId: string;
  status: AsyncJobStatus;
  step: string;
  payload: CreditApplicationJobPayload;
  resolvedIds: CreditApplicationJobResolvedIds;
  errorMessage: string | null;
  idempotencyKey: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJobProps {
  status: AsyncJobStatus;
  step: string;
  payload: CreditApplicationJobPayload;
  resolvedIds: CreditApplicationJobResolvedIds;
  idempotency_key?: string | null;
}

export interface CreditApplicationJobRepository {
  create(props: CreateJobProps): Promise<CreditApplicationJobRecord>;
  find_by_external_id(external_id: string): Promise<CreditApplicationJobRecord | null>;
  find_by_idempotency_key(key: string): Promise<CreditApplicationJobRecord | null>;
  find_by_step(step: string): Promise<CreditApplicationJobRecord[]>;
  update_status_and_step(
    id: number,
    status: AsyncJobStatus,
    step: string,
    resolved_ids?: CreditApplicationJobResolvedIds,
  ): Promise<void>;
  update_failed(id: number, error_message: string): Promise<void>;
}
