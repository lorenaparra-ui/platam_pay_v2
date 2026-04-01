import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { Statuses } from '@platam/shared';
import type { ProductsCreditFacilitySyncPort } from '@modules/partners/application/ports/products-credit-facility-sync.port';

@Injectable()
export class SqlProductsCreditFacilitySyncAdapter
  implements ProductsCreditFacilitySyncPort
{
  private readonly logger = new Logger(SqlProductsCreditFacilitySyncAdapter.name);

  constructor(@InjectDataSource() private readonly data_source: DataSource) {}

  async create_credit_facility(input: Readonly<{
    credit_facility_external_id: string;
    contract_id: string | null;
    total_limit: string;
    state: Statuses;
  }>): Promise<{ internal_id: number }> {
    const existing = (await this.data_source.query<{ id: number }[]>(
      `SELECT id FROM products_schema.credit_facilities WHERE external_id = $1::uuid LIMIT 1`,
      [input.credit_facility_external_id],
    ));
    if (existing.length > 0) {
      this.logger.debug(
        `credit_facility ya existe external_id=${input.credit_facility_external_id}`,
      );
      return { internal_id: existing[0].id };
    }

    let contract_internal_id: number | null = null;
    if (input.contract_id !== null && input.contract_id !== undefined) {
      const contract_rows = await this.data_source.query<{ id: number }[]>(
        `SELECT id FROM products_schema.contracts WHERE external_id = $1::uuid LIMIT 1`,
        [input.contract_id],
      );
      if (contract_rows.length === 0) {
        throw new Error(
          `Contrato no encontrado: external_id=${input.contract_id}`,
        );
      }
      contract_internal_id = Number(contract_rows[0].id);
    }

    const rows = (await this.data_source.query<{ id: number }[]>(
      `INSERT INTO products_schema.credit_facilities (
        external_id, contract_id, state, total_limit
      ) VALUES (
        $1::uuid,
        $2::bigint,
        $3::products_schema.credit_facility_state,
        $4::numeric
      ) RETURNING id`,
      [
        input.credit_facility_external_id,
        contract_internal_id,
        input.state,
        input.total_limit,
      ],
    ));

    return { internal_id: rows[0].id };
  }

  async update_credit_facility_state(
    credit_facility_external_id: string,
    state: Statuses,
  ): Promise<void> {
    await this.data_source.query(
      `UPDATE products_schema.credit_facilities
         SET state = $2::products_schema.credit_facility_state
       WHERE external_id = $1::uuid`,
      [credit_facility_external_id, state],
    );
    this.logger.debug(
      `credit_facility estado actualizado external_id=${credit_facility_external_id} → ${state}`,
    );
  }
}
