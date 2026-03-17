import { type CreditApplicationStatusCode } from "../../domain/models/credit-application-status-code.model";
import type { BackofficeCreditApplicationsSortBy } from "../../domain/ports/backoffice-credit-applications-read.repository.port";
export declare class ListCreditApplicationsQueryDto {
    limit?: number;
    cursor?: string;
    status_codes?: CreditApplicationStatusCode[];
    partner_external_id?: string;
    search?: string;
    sort_by?: BackofficeCreditApplicationsSortBy;
}
