import type { CreditFacilityState } from '@platam/shared';
export declare const PRODUCTS_CREDIT_FACILITY_SYNC_PORT: unique symbol;
export interface ProductsCreditFacilitySyncPort {
    create_credit_facility(input: Readonly<{
        credit_facility_external_id: string;
        contract_id: string | null;
        total_limit: string;
        state: CreditFacilityState;
        business_id: number;
    }>): Promise<{
        internal_id: number;
    }>;
    update_credit_facility_state(credit_facility_external_id: string, state: CreditFacilityState): Promise<void>;
}
