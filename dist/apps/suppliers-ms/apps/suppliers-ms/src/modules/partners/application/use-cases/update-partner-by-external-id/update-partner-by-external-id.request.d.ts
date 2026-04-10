import type { Statuses } from '@platam/shared';
export declare class UpdatePartnerByExternalIdRequest {
    readonly external_id: string;
    readonly acronym: string | null | undefined;
    readonly logo_url: string | null | undefined;
    readonly co_branding_logo_url: string | null | undefined;
    readonly primary_color: string | null | undefined;
    readonly secondary_color: string | null | undefined;
    readonly light_color: string | null | undefined;
    readonly notification_email: string | null | undefined;
    readonly webhook_url: string | null | undefined;
    readonly send_sales_rep_voucher: boolean | undefined;
    readonly disbursement_notification_email: string | null | undefined;
    readonly state: Statuses | undefined;
    constructor(external_id: string, acronym: string | null | undefined, logo_url: string | null | undefined, co_branding_logo_url: string | null | undefined, primary_color: string | null | undefined, secondary_color: string | null | undefined, light_color: string | null | undefined, notification_email: string | null | undefined, webhook_url: string | null | undefined, send_sales_rep_voucher: boolean | undefined, disbursement_notification_email: string | null | undefined, state: Statuses | undefined);
}
