import { PartnersEntity } from '@app/suppliers-data';
import { Partner } from '@modules/partners/domain/entities/partner.entity';
import { Statuses } from '@platam/shared';

export class PartnerMapper {
  static to_domain(row: PartnersEntity): Partner {
    return new Partner({
      internal_id: row.id,
      supplier_id: row.supplier.id,
      external_id: row.externalId,
      acronym: row.acronym ?? null,
      logo_url: row.logoUrl ?? null,
      co_branding_logo_url: row.coBrandingLogoUrl ?? null,
      primary_color: row.primaryColor ?? null,
      secondary_color: row.secondaryColor ?? null,
      light_color: row.lightColor ?? null,
      notification_email: row.notificationEmail ?? null,
      webhook_url: row.webhookUrl ?? null,
      send_sales_rep_voucher: row.sendSalesRepVoucher,
      disbursement_notification_email: row.disbursementNotificationEmail ?? null,
      state: row.state,
      created_at: row.createdAt,
      updated_at: row.updatedAt,
    });
  }

  static from_raw_row(row: Record<string, unknown>): Partner {
    const state_raw = String(row['state'] ?? Statuses.ACTIVE);
    const state =
      state_raw === Statuses.INACTIVE ? Statuses.INACTIVE : Statuses.ACTIVE;

    return new Partner({
      internal_id: Number(row['id']),
      supplier_id: Number(row['supplier_id']),
      external_id: String(row['external_id']),
      acronym: (row['acronym'] as string | null) ?? null,
      logo_url: (row['logo_url'] as string | null) ?? null,
      co_branding_logo_url: (row['co_branding_logo_url'] as string | null) ?? null,
      primary_color: (row['primary_color'] as string | null) ?? null,
      secondary_color: (row['secondary_color'] as string | null) ?? null,
      light_color: (row['light_color'] as string | null) ?? null,
      notification_email: (row['notification_email'] as string | null) ?? null,
      webhook_url: (row['webhook_url'] as string | null) ?? null,
      send_sales_rep_voucher: Boolean(row['send_sales_rep_voucher']),
      disbursement_notification_email:
        (row['disbursement_notification_email'] as string | null) ?? null,
      state,
      created_at: new Date(String(row['created_at'])),
      updated_at: new Date(String(row['updated_at'])),
    });
  }
}
