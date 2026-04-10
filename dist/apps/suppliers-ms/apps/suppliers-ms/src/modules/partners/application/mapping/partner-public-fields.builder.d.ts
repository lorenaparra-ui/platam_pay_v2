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
export declare function build_partner_public_fields(partner: Partner, lookup: SuppliersReferenceLookupPort): Promise<PartnerPublicFields>;
