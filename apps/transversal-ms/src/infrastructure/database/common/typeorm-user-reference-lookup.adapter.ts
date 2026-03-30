import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserReferenceLookupPort } from '@modules/users/domain/ports/user-reference-lookup.port';

@Injectable()
export class TypeormUserReferenceLookupAdapter implements UserReferenceLookupPort {
  constructor(
    @InjectDataSource()
    private readonly data_source: DataSource,
  ) {}

  async get_role_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null> {
    const rows = (await this.data_source.query(
      `SELECT id FROM transversal_schema.roles WHERE external_id = $1::uuid LIMIT 1`,
      [external_id],
    )) as Array<{ id: string | number }>;
    if (!rows?.length) {
      return null;
    }
    return Number(rows[0].id);
  }

  async get_role_external_id_by_internal_id(
    internal_id: number | null,
  ): Promise<string | null> {
    if (internal_id === null) {
      return null;
    }
    const rows = (await this.data_source.query(
      `SELECT external_id::text AS external_id FROM transversal_schema.roles WHERE id = $1 LIMIT 1`,
      [internal_id],
    )) as Array<{ external_id: string }>;
    if (!rows?.length) {
      return null;
    }
    return rows[0].external_id;
  }

  async get_status_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null> {
    const rows = (await this.data_source.query(
      `SELECT id FROM transversal_schema.statuses WHERE external_id = $1::uuid LIMIT 1`,
      [external_id],
    )) as Array<{ id: string | number }>;
    if (!rows?.length) {
      return null;
    }
    return Number(rows[0].id);
  }

  async get_status_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null> {
    const rows = (await this.data_source.query(
      `SELECT external_id::text AS external_id FROM transversal_schema.statuses WHERE id = $1 LIMIT 1`,
      [internal_id],
    )) as Array<{ external_id: string }>;
    if (!rows?.length) {
      return null;
    }
    return rows[0].external_id;
  }
}
