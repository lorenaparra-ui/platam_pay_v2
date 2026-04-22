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
      `SELECT sr.partner_id, sr.external_id AS sales_rep_external_id, p.external_id AS partner_external_id
       FROM suppliers_schema.sales_representatives sr
       LEFT JOIN suppliers_schema.partners p ON p.id = sr.partner_id
       WHERE sr.user_id = $1
       LIMIT 1`,
      [user_internal_id],
    )) as Array<{ partner_id: unknown; sales_rep_external_id: unknown; partner_external_id: unknown }>;

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      partnerId: String(row.partner_id),
      partnerExternalId: row.partner_external_id != null ? String(row.partner_external_id) : null,
      salesRepresentativeExternalId: String(row.sales_rep_external_id),
    };
  }
}
