import { type CreditApplicationStatusCode } from "../../domain/models/credit-application-status-code.model";
export declare class CreditApplicationStatusCountItemDto {
    status_code: CreditApplicationStatusCode;
    total: number;
}
export declare class CreditApplicationStatusCountsResponseDto {
    total: number;
    counts: CreditApplicationStatusCountItemDto[];
}
