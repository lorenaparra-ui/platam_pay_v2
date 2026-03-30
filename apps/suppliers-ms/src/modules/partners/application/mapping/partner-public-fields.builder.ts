import { InternalServerErrorException } from '@nestjs/common';
import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { Partner } from '@modules/partners/domain/entities/partner.entity';

export interface PartnerPublicFields {
  external_id: string;
  business_external_id: string;
  acronym: string | null;
  logo_url: string | null;
  co_branding_logo_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  light_color: string | null;
  sales_rep_role_name: string | null;
  sales_rep_role_name_plural: string | null;
  notification_email: string | null;
  webhook_url: string | null;
  send_sales_rep_voucher: boolean;
  disbursement_notification_email: string | null;
  created_at: Date;
  updated_at: Date;
}

export async function build_partner_public_fields(
  partner: Partner,
  lookup: SuppliersReferenceLookupPort,
): Promise<PartnerPublicFields> {
  const business_external_id =
    await lookup.get_business_external_id_by_internal_id(partner.business_id);
  if (!business_external_id) {
    throw new InternalServerErrorException();
  }

  return {
    external_id: partner.external_id,
    business_external_id,
    acronym: partner.acronym,
    logo_url: partner.logo_url,
    co_branding_logo_url: partner.co_branding_logo_url,
    primary_color: partner.primary_color,
    secondary_color: partner.secondary_color,
    light_color: partner.light_color,
    sales_rep_role_name: partner.sales_rep_role_name,
    sales_rep_role_name_plural: partner.sales_rep_role_name_plural,
    notification_email: partner.notification_email,
    webhook_url: partner.webhook_url,
    send_sales_rep_voucher: partner.send_sales_rep_voucher,
    disbursement_notification_email: partner.disbursement_notification_email,
    created_at: partner.created_at,
    updated_at: partner.updated_at,
  };
}
