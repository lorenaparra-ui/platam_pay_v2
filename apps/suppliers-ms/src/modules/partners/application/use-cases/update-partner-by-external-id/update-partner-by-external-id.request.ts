import type { Statuses } from '@platam/shared';

export class UpdatePartnerByExternalIdRequest {
  constructor(
    readonly external_id: string,
    readonly acronym: string | null | undefined,
    readonly logo_url: string | null | undefined,
    readonly co_branding_logo_url: string | null | undefined,
    readonly primary_color: string | null | undefined,
    readonly secondary_color: string | null | undefined,
    readonly light_color: string | null | undefined,
    readonly notification_email: string | null | undefined,
    readonly webhook_url: string | null | undefined,
    readonly send_sales_rep_voucher: boolean | undefined,
    readonly disbursement_notification_email: string | null | undefined,
    readonly state: Statuses | undefined,
  ) {}
}
