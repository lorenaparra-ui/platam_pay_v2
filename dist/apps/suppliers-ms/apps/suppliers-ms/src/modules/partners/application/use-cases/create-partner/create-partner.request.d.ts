export declare class CreatePartnerRequest {
    readonly supplier_internal_id: number;
    readonly acronym: string | null;
    readonly logo_url: string | null;
    readonly co_branding_logo_url: string | null;
    readonly primary_color: string | null;
    readonly secondary_color: string | null;
    readonly light_color: string | null;
    readonly notification_email: string | null;
    readonly webhook_url: string | null;
    readonly send_sales_rep_voucher: boolean;
    readonly disbursement_notification_email: string | null;
    constructor(supplier_internal_id: number, acronym: string | null, logo_url: string | null, co_branding_logo_url: string | null, primary_color: string | null, secondary_color: string | null, light_color: string | null, notification_email: string | null, webhook_url: string | null, send_sales_rep_voucher: boolean, disbursement_notification_email: string | null);
}
