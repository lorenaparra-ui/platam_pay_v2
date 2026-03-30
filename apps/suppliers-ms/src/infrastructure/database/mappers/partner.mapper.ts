import { PartnersEntity } from '@app/suppliers-data';
import { Partner } from '@modules/partners/domain/entities/partner.entity';

export class PartnerMapper {
  static to_domain(row: PartnersEntity): Partner {
    return new Partner(
      row.id,
      row.externalId,
      row.businessId,
      row.acronym ?? null,
      row.logoUrl ?? null,
      row.coBrandingLogoUrl ?? null,
      row.primaryColor ?? null,
      row.secondaryColor ?? null,
      row.lightColor ?? null,
      row.salesRepRoleName ?? null,
      row.salesRepRoleNamePlural ?? null,
      row.apiKeyHash,
      row.notificationEmail ?? null,
      row.webhookUrl ?? null,
      row.sendSalesRepVoucher,
      row.disbursementNotificationEmail ?? null,
      row.defaultRepId ?? null,
      row.statusId,
      row.createdAt,
      row.updatedAt,
    );
  }

  static from_raw_row(row: Record<string, unknown>): Partner {
    return new Partner(
      Number(row['id']),
      String(row['external_id']),
      Number(row['business_id']),
      (row['acronym'] as string | null) ?? null,
      (row['logo_url'] as string | null) ?? null,
      (row['co_branding_logo_url'] as string | null) ?? null,
      (row['primary_color'] as string | null) ?? null,
      (row['secondary_color'] as string | null) ?? null,
      (row['light_color'] as string | null) ?? null,
      (row['sales_rep_role_name'] as string | null) ?? null,
      (row['sales_rep_role_name_plural'] as string | null) ?? null,
      Boolean(row['api_key_hash']),
      (row['notification_email'] as string | null) ?? null,
      (row['webhook_url'] as string | null) ?? null,
      Boolean(row['send_sales_rep_voucher']),
      (row['disbursement_notification_email'] as string | null) ?? null,
      row['default_rep_id'] === null || row['default_rep_id'] === undefined
        ? null
        : Number(row['default_rep_id']),
      Number(row['status_id']),
      new Date(String(row['created_at'])),
      new Date(String(row['updated_at'])),
    );
  }
}
