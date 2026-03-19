export declare class CreateCategoryRequestDto {
    credit_facility_id: number;
    partner_id?: number | null;
    name: string;
    delay_days: number;
    disbursement_fee_percent?: string | null;
    discount_percentage: string;
    interest_rate: string;
    minimum_disbursement_fee?: string | null;
    term_days: number;
    status_id: number;
}
