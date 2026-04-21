import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type {
  PartnerLinkData,
  PartnerLinkReaderPort,
} from '@modules/users/domain/ports/partner-link.reader.port';

@Injectable()
export class TypeormPartnerLinkReader implements PartnerLinkReaderPort {
  constructor(@InjectDataSource() private readonly data_source: DataSource) {}

  async find_by_user_internal_id(user_internal_id: number): Promise<PartnerLinkData | null> {
    const rows = (await this.data_source.query(
      `SELECT partner_id, external_id
       FROM suppliers_schema.sales_representatives
       WHERE user_id = $1
       LIMIT 1`,
      [user_internal_id],
    )) as Array<{ partner_id: unknown; external_id: unknown }>;

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      partnerId: String(row.partner_id),
      salesRepresentativeExternalId: String(row.external_id),
    };
  }
}
