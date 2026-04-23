export class CreatePartnerRequest {
  constructor(
    readonly supplier_internal_id: number,
    readonly acronym: string | null,
    readonly logo_url: string | null,
    readonly co_branding_logo_url: string | null,
    readonly primary_color: string | null,
    readonly secondary_color: string | null,
    readonly light_color: string | null,
    readonly notification_email: string | null,
    readonly webhook_url: string | null,
    readonly send_sales_rep_voucher: boolean,
    readonly disbursement_notification_email: string | null,
  ) {}
}
