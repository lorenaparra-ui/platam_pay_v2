import { type CreditApplicationStatusCode } from "../../domain/models/credit-application-status-code.model";
import type { CustomerType, QueueLevel } from "../../domain/models/backoffice-credit-application-list-item.model";
export declare class CreditApplicationListItemResponseDto {
    application_id: number;
    application_external_id: string;
    partner_external_id: string | null;
    partner_logo_url: string | null;
    customer_full_name: string | null;
    customer_type: CustomerType | null;
    doc_type: string | null;
    doc_number: string | null;
    phone: string | null;
    email: string | null;
    sales_rep_name: string | null;
    requested_credit_line: number | null;
    submission_date: string | null;
    queue_days: number | null;
    queue_level: QueueLevel | null;
    status_code: CreditApplicationStatusCode | null;
    status_display_name: string | null;
}
