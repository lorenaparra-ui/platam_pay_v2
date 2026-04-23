import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { ExperianQueryStatus, ExperianQueryTypes } from '@platam/shared';
import {
  ExperianQuery,
  type CreateExperianQueryProps,
} from '@modules/credit-applications/domain/models/experian-query.models';
import type { ExperianQueryRepository } from '@modules/credit-applications/domain/ports/experian-query.repository.port';

type RawRow = {
  id: string;
  external_id: string;
  credit_application_id: string;
  person_id: string | null;
  business_id: string | null;
  query_type: string;
  credit_report: Record<string, unknown> | null;
  credit_score: string | null;
  consulted_at: Date;
  status: string;
  error_message: string | null;
  created_at: Date;
  updated_at: Date;
};

function map_row(r: RawRow): ExperianQuery {
  return new ExperianQuery(
    Number(r.id),
    r.external_id,
    Number(r.credit_application_id),
    r.person_id !== null ? Number(r.person_id) : null,
    r.business_id !== null ? Number(r.business_id) : null,
    r.query_type as ExperianQueryTypes,
    r.credit_report,
    r.credit_score,
    r.consulted_at,
    r.status as ExperianQueryStatus,
    r.error_message,
    r.created_at,
    r.updated_at,
  );
}

@Injectable()
export class TypeormExperianQueryRepository implements ExperianQueryRepository {
  constructor(
    @InjectDataSource()
    private readonly ds: DataSource,
  ) {}

  async create(props: CreateExperianQueryProps): Promise<ExperianQuery> {
    const rows = await this.ds.query<RawRow[]>(
      `INSERT INTO products_schema.experian_queries
         (credit_application_id, person_id, business_id, query_type, credit_report, credit_score, consulted_at, status, error_message)
       VALUES ($1, $2, $3, $4::products_schema.experian_query_type, $5::jsonb, $6, $7, $8::products_schema.experian_query_status, $9)
       RETURNING *`,
      [
        props.credit_application_id,
        props.person_id,
        props.business_id,
        props.query_type,
        props.credit_report !== null ? JSON.stringify(props.credit_report) : null,
        props.credit_score,
        props.consulted_at,
        props.status,
        props.error_message,
      ],
    );
    return map_row(rows[0]);
  }

  async find_by_credit_application_id(
    credit_application_id: number,
  ): Promise<ExperianQuery | null> {
    const rows = await this.ds.query<RawRow[]>(
      `SELECT * FROM products_schema.experian_queries
       WHERE credit_application_id = $1
       ORDER BY id DESC LIMIT 1`,
      [credit_application_id],
    );
    return rows[0] ? map_row(rows[0]) : null;
  }
}
