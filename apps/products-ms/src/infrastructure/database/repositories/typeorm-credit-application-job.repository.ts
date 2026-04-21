import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AsyncJobStatus, AsyncJobStep } from '@platam/shared';
import type {
  CreditApplicationJobPayload,
  CreditApplicationJobResolvedIds,
} from '@app/products-data';
import type {
  CreditApplicationJobRecord,
  CreditApplicationJobRepository,
  CreateJobProps,
} from '@modules/credit-applications/domain/ports/credit-application-job.port';

type RawJobRow = {
  id: string;
  external_id: string;
  status: string;
  step: string;
  payload: CreditApplicationJobPayload;
  resolved_ids: CreditApplicationJobResolvedIds;
  error_message: string | null;
  idempotency_key: string | null;
  created_at: Date;
  updated_at: Date;
};

function map_row(r: RawJobRow): CreditApplicationJobRecord {
  return {
    id: Number(r.id),
    externalId: r.external_id,
    status: r.status as AsyncJobStatus,
    step: r.step,
    payload: r.payload,
    resolvedIds: r.resolved_ids ?? {},
    errorMessage: r.error_message,
    idempotencyKey: r.idempotency_key,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

@Injectable()
export class TypeormCreditApplicationJobRepository implements CreditApplicationJobRepository {
  constructor(
    @InjectDataSource()
    private readonly ds: DataSource,
  ) {}

  async create(props: CreateJobProps): Promise<CreditApplicationJobRecord> {
    const rows = await this.ds.query<RawJobRow[]>(
      `INSERT INTO products_schema.credit_application_jobs
         (status, step, payload, resolved_ids, idempotency_key)
       VALUES ($1, $2, $3::jsonb, $4::jsonb, $5)
       RETURNING *`,
      [
        props.status,
        props.step,
        JSON.stringify(props.payload),
        JSON.stringify(props.resolvedIds),
        props.idempotency_key ?? null,
      ],
    );
    return map_row(rows[0]);
  }

  async find_by_external_id(external_id: string): Promise<CreditApplicationJobRecord | null> {
    const rows = await this.ds.query<RawJobRow[]>(
      `SELECT * FROM products_schema.credit_application_jobs
       WHERE external_id = $1::uuid LIMIT 1`,
      [external_id],
    );
    return rows[0] ? map_row(rows[0]) : null;
  }

  async find_by_idempotency_key(key: string): Promise<CreditApplicationJobRecord | null> {
    const rows = await this.ds.query<RawJobRow[]>(
      `SELECT * FROM products_schema.credit_application_jobs
       WHERE idempotency_key = $1 LIMIT 1`,
      [key],
    );
    return rows[0] ? map_row(rows[0]) : null;
  }

  async find_by_step(step: string): Promise<CreditApplicationJobRecord[]> {
    const rows = await this.ds.query<RawJobRow[]>(
      `SELECT * FROM products_schema.credit_application_jobs
       WHERE status = $1 AND step = $2
       ORDER BY id ASC LIMIT 100`,
      [AsyncJobStatus.RUNNING, step],
    );
    return rows.map(map_row);
  }

  async update_status_and_step(
    id: number,
    status: AsyncJobStatus,
    step: string,
    resolved_ids?: CreditApplicationJobResolvedIds,
  ): Promise<void> {
    if (resolved_ids !== undefined) {
      await this.ds.query(
        `UPDATE products_schema.credit_application_jobs
         SET status = $1, step = $2, resolved_ids = resolved_ids || $3::jsonb
         WHERE id = $4`,
        [status, step, JSON.stringify(resolved_ids), id],
      );
    } else {
      await this.ds.query(
        `UPDATE products_schema.credit_application_jobs
         SET status = $1, step = $2
         WHERE id = $3`,
        [status, step, id],
      );
    }
  }

  async update_failed(id: number, error_message: string): Promise<void> {
    await this.ds.query(
      `UPDATE products_schema.credit_application_jobs
       SET status = $1, step = $2, error_message = $3
       WHERE id = $4`,
      [AsyncJobStatus.FAILED, AsyncJobStep.FAILED, error_message, id],
    );
  }
}
