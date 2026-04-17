import { Entity } from '@platam/shared';
import type { PartnerState } from '@platam/shared';
export interface PartnerProps {
    readonly internal_id: number;
    readonly supplier_id: number;
    readonly external_id: string;
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
    readonly state: PartnerState;
    readonly created_at: Date;
    readonly updated_at: Date;
}
export declare class Partner extends Entity<PartnerProps> {
    constructor(props: PartnerProps);
    get id(): string;
    get internal_id(): number;
    get supplier_id(): number;
    get external_id(): string;
    get acronym(): string | null;
    get logo_url(): string | null;
    get co_branding_logo_url(): string | null;
    get primary_color(): string | null;
    get secondary_color(): string | null;
    get light_color(): string | null;
    get notification_email(): string | null;
    get webhook_url(): string | null;
    get send_sales_rep_voucher(): boolean;
    get disbursement_notification_email(): string | null;
    get state(): PartnerState;
    get created_at(): Date;
    get updated_at(): Date;
    toPrimitives(): Record<string, unknown>;
}
export interface CreatePartnerProps {
    supplier_id: number;
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
}
export type UpdatePartnerProps = Partial<{
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
    state: PartnerState;
}>;
