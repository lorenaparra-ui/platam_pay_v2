import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { WebQueryType } from '@platam/shared';
import {
  WebQuery,
  type CreateWebQueryProps,
} from '@modules/credit-applications/domain/models/web-query.models';
import type { WebQueryRepository } from '@modules/credit-applications/domain/ports/web-query.repository.port';

type RawRow = {
  id: string;
  external_id: string;
  credit_application_id: string;
  query_type: string;
  person_id: string | null;
  consulted_at: Date;
  query_result: Record<string, unknown> | null;
  created_at: Date;
  updated_at: Date;
};

function map_row(r: RawRow): WebQuery {
  return new WebQuery(
    Number(r.id),
    r.external_id,
    Number(r.credit_application_id),
    r.query_type as WebQueryType,
    r.person_id !== null ? Number(r.person_id) : null,
    r.consulted_at,
    r.query_result,
    r.created_at,
    r.updated_at,
  );
}

@Injectable()
export class TypeormWebQueryRepository implements WebQueryRepository {
  constructor(
    @InjectDataSource()
    private readonly ds: DataSource,
  ) {}

  async create(props: CreateWebQueryProps): Promise<WebQuery> {
    const rows = await this.ds.query<RawRow[]>(
      `INSERT INTO products_schema.web_queries
         (credit_application_id, query_type, person_id, consulted_at, query_result)
       VALUES ($1, $2::products_schema.web_query_type, $3, $4, $5::jsonb)
       RETURNING *`,
      [
        props.credit_application_id,
        props.query_type,
        props.person_id,
        props.consulted_at,
        props.query_result !== null ? JSON.stringify(props.query_result) : null,
      ],
    );
    return map_row(rows[0]);
  }

  async find_by_credit_application_id_and_type(
    credit_application_id: number,
    query_type: WebQueryType,
  ): Promise<WebQuery | null> {
    const rows = await this.ds.query<RawRow[]>(
      `SELECT * FROM products_schema.web_queries
       WHERE credit_application_id = $1 AND query_type = $2::products_schema.web_query_type
       ORDER BY id DESC LIMIT 1`,
      [credit_application_id, query_type],
    );
    return rows[0] ? map_row(rows[0]) : null;
  }
}
