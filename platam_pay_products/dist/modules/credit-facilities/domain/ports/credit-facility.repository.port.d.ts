import type { CreditFacility } from "../models/credit-facility.model";
export declare const CREDIT_FACILITY_REPOSITORY: unique symbol;
export interface CreateCreditFacilityInput {
    contract_id: string | null;
    status_id: number;
    total_limit: string;
}
export interface CreditFacilityRepositoryPort {
    create(input: CreateCreditFacilityInput): Promise<CreditFacility>;
}
