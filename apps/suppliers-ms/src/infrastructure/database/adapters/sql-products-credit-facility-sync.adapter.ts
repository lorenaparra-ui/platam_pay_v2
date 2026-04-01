import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { CreditFacilitiesStatuses } from '@platam/shared';
import type { ProductsCreditFacilitySyncPort } from '@modules/partners/application/ports/products-credit-facility-sync.port';
@Injectable()
export class SqlProductsCreditFacilitySyncAdapter
  implements ProductsCreditFacilitySyncPort
{
  private readonly logger = new Logger(SqlProductsCreditFacilitySyncAdapter.name);

  constructor(@InjectDataSource() private readonly data_source: DataSource) {}

  async ensure_credit_facility(input: Readonly<{
    credit_facility_external_id: string;
    contract_id: string | null;
    total_limit: string;
    state: CreditFacilitiesStatuses;
  }>): Promise<void> {
    const existing = (await this.data_source.query(
      `SELECT 1 FROM products_schema.credit_facilities WHERE external_id = $1::uuid LIMIT 1`,
      [input.credit_facility_external_id],
    )) as unknown[];
    if (existing.length > 0) {
      this.logger.debug(
        `credit_facility ya existe external_id=${input.credit_facility_external_id}`,
      );
      return;
    }

    await this.data_source.query(
      `INSERT INTO products_schema.credit_facilities (
        external_id, contract_id, state, total_limit
      ) VALUES (
        $1::uuid,
        $2,
        $3::products_schema.credit_facility_state,
        $4::numeric
      )`,
      [
        input.credit_facility_external_id,
        input.contract_id,
        input.state,
        input.total_limit,
      ],
    );
  }
}
