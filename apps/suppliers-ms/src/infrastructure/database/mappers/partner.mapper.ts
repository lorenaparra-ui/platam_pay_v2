import { PartnersEntity } from '@app/suppliers-data';
import { Partner } from '@modules/partners/domain/entities/partner.entity';
import { CreditFacilitiesStatuses } from '@platam/shared';

export class PartnerMapper {
  static to_domain(row: PartnersEntity): Partner {
    return new Partner(
      row.id,
      row.supplier.id,
      row.externalId,
      row.acronym ?? null,
      row.logoUrl ?? null,
      row.coBrandingLogoUrl ?? null,
      row.primaryColor ?? null,
      row.secondaryColor ?? null,
      row.lightColor ?? null,
      row.notificationEmail ?? null,
      row.webhookUrl ?? null,
      row.sendSalesRepVoucher,
      row.disbursementNotificationEmail ?? null,
      row.state,
      row.createdAt,
      row.updatedAt,
    );
  }

  static from_raw_row(row: Record<string, unknown>): Partner {
    const state_raw = String(row['state'] ?? CreditFacilitiesStatuses.ACTIVE);
    const state =
      state_raw === CreditFacilitiesStatuses.INACTIVE
        ? CreditFacilitiesStatuses.INACTIVE
        : CreditFacilitiesStatuses.ACTIVE;

    return new Partner(
      Number(row['id']),
      Number(row['supplier_id']),
      String(row['external_id']),
      (row['acronym'] as string | null) ?? null,
      (row['logo_url'] as string | null) ?? null,
      (row['co_branding_logo_url'] as string | null) ?? null,
      (row['primary_color'] as string | null) ?? null,
      (row['secondary_color'] as string | null) ?? null,
      (row['light_color'] as string | null) ?? null,
      (row['notification_email'] as string | null) ?? null,
      (row['webhook_url'] as string | null) ?? null,
      Boolean(row['send_sales_rep_voucher']),
      (row['disbursement_notification_email'] as string | null) ?? null,
      state,
      new Date(String(row['created_at'])),
      new Date(String(row['updated_at'])),
    );
  }
}
