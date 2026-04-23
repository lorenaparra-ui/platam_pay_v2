import { InternalServerErrorException } from '@nestjs/common';
import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { Partner } from '@modules/partners/domain/entities/partner.entity';

export interface PartnerPublicFields {
  internal_id: number;
  external_id: string;
  supplier_external_id: string;
  acronym: string | null;
  logo_url: string | null;
  co_branding_logo_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  light_color: string | null;
  notification_email: string | null;
  webhook_url: string | null;
  send_sales_rep_voucher: boolean;
  disbursement_notification_email: string | null;
  state: string;
  created_at: Date;
  updated_at: Date;
}

export async function build_partner_public_fields(
  partner: Partner,
  lookup: SuppliersReferenceLookupPort,
): Promise<PartnerPublicFields> {
  const supplier_external_id =
    await lookup.get_supplier_external_id_by_internal_id(partner.supplier_id);
  if (supplier_external_id === null) {
    throw new InternalServerErrorException();
  }

  return {
    internal_id: partner.internal_id,
    external_id: partner.external_id,
    supplier_external_id,
    acronym: partner.acronym,
    logo_url: partner.logo_url,
    co_branding_logo_url: partner.co_branding_logo_url,
    primary_color: partner.primary_color,
    secondary_color: partner.secondary_color,
    light_color: partner.light_color,
    notification_email: partner.notification_email,
    webhook_url: partner.webhook_url,
    send_sales_rep_voucher: partner.send_sales_rep_voucher,
    disbursement_notification_email: partner.disbursement_notification_email,
    state: partner.state,
    created_at: partner.created_at,
    updated_at: partner.updated_at,
  };
}
