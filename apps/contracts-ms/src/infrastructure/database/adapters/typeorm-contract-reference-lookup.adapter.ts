import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { ContractCatalogStatus } from '@platam/shared';
import type { ContractReferenceLookupPort } from '@common/ports/contract-reference-lookup.port';

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

const CONTRACT_CATALOG_STATUSES = new Set<string>([
  'pending',
  'signed',
  'cancelled',
]);

function as_contract_catalog_status(code: string | null | undefined): ContractCatalogStatus | null {
  if (code === null || code === undefined || code.length === 0) {
    return null;
  }
  if (!CONTRACT_CATALOG_STATUSES.has(code)) {
    return null;
  }
  return code as ContractCatalogStatus;
}

@Injectable()
export class TypeormContractReferenceLookupAdapter implements ContractReferenceLookupPort {
  constructor(@InjectDataSource() private readonly data_source: DataSource) {}

  async get_user_internal_id_by_external_id(external_id: string): Promise<number | null> {
    const rows: Array<{ id: unknown }> = await this.data_source.query(
      `SELECT id FROM transversal_schema.users WHERE external_id = $1::uuid LIMIT 1`,
      [external_id],
    );
    return rows.length === 0 ? null : row_id_as_number(rows[0].id);
  }

  async get_application_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null> {
    const rows: Array<{ id: unknown }> = await this.data_source.query(
      `SELECT id FROM products_schema.credit_applications WHERE external_id = $1::uuid LIMIT 1`,
      [external_id],
    );
    return rows.length === 0 ? null : row_id_as_number(rows[0].id);
  }

  async get_contract_catalog_status_by_external_id(
    external_id: string,
  ): Promise<ContractCatalogStatus | null> {
    const rows: Array<{ code: string | null }> = await this.data_source.query(
      `SELECT code
       FROM transversal_schema.catalog_status_types
       WHERE external_id = $1::uuid AND entity_type = 'contracts'
       LIMIT 1`,
      [external_id],
    );
    if (rows.length === 0) {
      return null;
    }
    return as_contract_catalog_status(rows[0].code);
  }

  async get_contract_status_external_id_by_catalog_status(
    status: ContractCatalogStatus,
  ): Promise<string | null> {
    const rows: Array<{ external_id: string | null }> = await this.data_source.query(
      `SELECT external_id::text AS external_id
       FROM transversal_schema.catalog_status_types
       WHERE entity_type = 'contracts' AND code = $1
       LIMIT 1`,
      [status],
    );
    const v = rows[0]?.external_id;
    return v === undefined || v === null || v.length === 0 ? null : v;
  }

  async get_contract_template_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null> {
    const rows: Array<{ id: unknown }> = await this.data_source.query(
      `SELECT id FROM products_schema.contract_templates
       WHERE external_id = $1::uuid
       LIMIT 1`,
      [external_id],
    );
    return rows.length === 0 ? null : row_id_as_number(rows[0].id);
  }

  async get_default_contract_template_internal_id(): Promise<number | null> {
    const rows: Array<{ id: unknown }> = await this.data_source.query(
      `SELECT id
       FROM products_schema.contract_templates
       WHERE version = 1
       ORDER BY id ASC
       LIMIT 1`,
    );
    return rows.length === 0 ? null : row_id_as_number(rows[0].id);
  }

  async get_contract_template_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null> {
    const rows: Array<{ external_id: string | null }> = await this.data_source.query(
      `SELECT external_id::text AS external_id
       FROM products_schema.contract_templates
       WHERE id = $1
       LIMIT 1`,
      [internal_id],
    );
    const v = rows[0]?.external_id;
    return v === undefined || v === null || v.length === 0 ? null : v;
  }

  async get_zapsign_template_ref_by_internal_id(
    template_internal_id: number,
  ): Promise<string | null> {
    const rows: Array<{ zapsign_template_ref: string | null }> = await this.data_source.query(
      `SELECT zapsign_template_ref
       FROM products_schema.contract_templates
       WHERE id = $1
       LIMIT 1`,
      [template_internal_id],
    );
    const ref = rows[0]?.zapsign_template_ref;
    if (ref === undefined || ref === null || String(ref).trim().length === 0) {
      return null;
    }
    return String(ref).trim();
  }
}
