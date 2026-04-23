import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { SarlaftCheckStatuses } from '@platam/shared';
import {
  SarlaftCheck,
  type CreateSarlaftCheckProps,
} from '@modules/credit-applications/domain/models/sarlaft-check.models';
import type { SarlaftCheckRepository } from '@modules/credit-applications/domain/ports/sarlaft-check.repository.port';

type RawRow = {
  id: string;
  external_id: string;
  credit_application_id: string;
  person_id: string;
  business_id: string | null;
  has_match: boolean;
  status: string;
  consulted_at: Date;
  sources: Record<string, unknown> | null;
  detail: string | null;
  created_at: Date;
  updated_at: Date;
};

function map_row(r: RawRow): SarlaftCheck {
  return new SarlaftCheck(
    Number(r.id),
    r.external_id,
    Number(r.credit_application_id),
    Number(r.person_id),
    r.business_id !== null ? Number(r.business_id) : null,
    r.has_match,
    r.status as SarlaftCheckStatuses,
    r.consulted_at,
    r.sources,
    r.detail,
    r.created_at,
    r.updated_at,
  );
}

@Injectable()
export class TypeormSarlaftCheckRepository implements SarlaftCheckRepository {
  constructor(
    @InjectDataSource()
    private readonly ds: DataSource,
  ) {}

  async create(props: CreateSarlaftCheckProps): Promise<SarlaftCheck> {
    const rows = await this.ds.query<RawRow[]>(
      `INSERT INTO products_schema.sarlaft_checks
         (credit_application_id, person_id, business_id, has_match, status, consulted_at, sources, detail)
       VALUES ($1, $2, $3, $4, $5::products_schema.sarlaft_check_status, $6, $7::jsonb, $8)
       RETURNING *`,
      [
        props.credit_application_id,
        props.person_id,
        props.business_id,
        props.has_match,
        props.status,
        props.consulted_at,
        props.sources !== null ? JSON.stringify(props.sources) : null,
        props.detail,
      ],
    );
    return map_row(rows[0]);
  }

  async find_by_credit_application_id(
    credit_application_id: number,
  ): Promise<SarlaftCheck | null> {
    const rows = await this.ds.query<RawRow[]>(
      `SELECT * FROM products_schema.sarlaft_checks
       WHERE credit_application_id = $1
       ORDER BY id DESC LIMIT 1`,
      [credit_application_id],
    );
    return rows[0] ? map_row(rows[0]) : null;
  }
}
