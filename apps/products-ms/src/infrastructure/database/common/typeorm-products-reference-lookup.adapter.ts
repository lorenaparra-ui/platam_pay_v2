import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreditFacilityEntity } from '@app/products-data';
import type { ProductsReferenceLookupPort } from '@common/ports/products-reference-lookup.port';

@Injectable()
export class TypeormProductsReferenceLookupAdapter
  implements ProductsReferenceLookupPort
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

  async get_partner_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null> {
    const rows: Array<{ id: number }> = await this.data_source.query(
      `SELECT id
       FROM suppliers_schema.partners
       WHERE external_id = $1::uuid
       LIMIT 1`,
      [external_id],
    );
    return rows[0]?.id ?? null;
  }

  async get_sales_representative_internal_id_by_external_id(
    external_id: string,
    partner_internal_id: number | null,
  ): Promise<number | null> {
    if (partner_internal_id !== null) {
      const rows: Array<{ id: number }> = await this.data_source.query(
        `SELECT sr.id
         FROM suppliers_schema.sales_representatives sr
         WHERE sr.external_id = $1::uuid AND sr.partner_id = $2
         LIMIT 1`,
        [external_id, partner_internal_id],
      );
      return rows[0]?.id ?? null;
    }
    const rows: Array<{ id: number }> = await this.data_source.query(
      `SELECT id
       FROM suppliers_schema.sales_representatives
       WHERE external_id = $1::uuid
       LIMIT 1`,
      [external_id],
    );
    return rows[0]?.id ?? null;
  }

  async get_partner_name_by_internal_id(internal_id: number): Promise<string | null> {
    const rows: Array<{ alias: string | null }> = await this.data_source.query(
      `SELECT alias FROM suppliers_schema.partners WHERE id = $1 LIMIT 1`,
      [internal_id],
    );
    const v = rows[0]?.alias;
    return v === undefined || v === null || v.length === 0 ? null : v;
  }
}
