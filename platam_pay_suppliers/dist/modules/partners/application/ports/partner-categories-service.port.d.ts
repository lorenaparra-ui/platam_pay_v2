export declare const PARTNER_CATEGORIES_SERVICE = "PARTNER_CATEGORIES_SERVICE";
export interface PartnerCategoriesServicePort {
    createCreditFacilityAndCategories(payload: {
        partner_id: number;
        partner_external_id: string;
        business_id: number;
        categories: Array<{
            name: string;
            term_days: number;
            delay_days: number;
            discount_percentage: number;
            interest_rate: number;
            disbursement_fee_percent: number;
            minimum_disbursement_fee: number;
        }>;
    }): Promise<{
        credit_facility_id: number;
    }>;
}
