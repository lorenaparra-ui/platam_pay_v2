import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreditFacilityEntity } from '@app/products-data';
import type { ProductsReferenceLookupPort } from '@common/ports/products-reference-lookup.port';
import type { CreditFacilityStatusLookupPort } from '@modules/credit-facilities/domain/ports/credit-facility-status-lookup.port';

function row_id_as_number(value: unknown): number | null {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string' && value.length > 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

@Injectable()
export class TypeormProductsReferenceLookupAdapter
  implements ProductsReferenceLookupPort, CreditFacilityStatusLookupPort
{
  constructor(
    @InjectRepository(CreditFacilityEntity)
    private readonly credit_facilities: Repository<CreditFacilityEntity>,
    @InjectDataSource()
    private readonly data_source: DataSource,
  ) {}

  async get_credit_facility_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null> {
    const row = await this.credit_facilities.findOne({
      where: { externalId: external_id },
      select: { id: true },
    });
    return row?.id ?? null;
  }

  async get_credit_facility_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null> {
    const row = await this.credit_facilities.findOne({
      where: { id: internal_id },
      select: { externalId: true },
    });
    return row?.externalId ?? null;
  }

  async get_status_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null> {
    const rows: Array<{ id: unknown }> = await this.data_source.query(
      `SELECT id FROM transversal_schema.statuses WHERE external_id = $1::uuid LIMIT 1`,
      [external_id],
    );
    return rows.length === 0 ? null : row_id_as_number(rows[0].id);
  }

  async get_status_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null> {
    const rows: Array<{ external_id: string | null }> =
      await this.data_source.query(
        `SELECT external_id::text AS external_id
         FROM transversal_schema.statuses
         WHERE id = $1
         LIMIT 1`,
        [internal_id],
      );
    const v = rows[0]?.external_id;
    return v === undefined || v === null || v.length === 0 ? null : v;
  }

  async get_partner_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null> {
    const rows: Array<{ external_id: string | null }> =
      await this.data_source.query(
        `SELECT external_id::text AS external_id
         FROM suppliers_schema.partners
         WHERE id = $1
         LIMIT 1`,
        [internal_id],
      );
    const v = rows[0]?.external_id;
    return v === undefined || v === null || v.length === 0 ? null : v;
  }
}
