import { CreditApplicationListItemResponseDto } from "./credit-application-list-item.response.dto";
export declare class CreditApplicationsPaginationDto {
    has_more: boolean;
    page_size: number;
    next_cursor: string | null;
}
export declare class ListCreditApplicationsResponseDto {
    items: CreditApplicationListItemResponseDto[];
    pagination: CreditApplicationsPaginationDto;
}
