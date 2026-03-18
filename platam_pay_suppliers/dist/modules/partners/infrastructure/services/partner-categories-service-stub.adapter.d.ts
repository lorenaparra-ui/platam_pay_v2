import type { PartnerCategoriesServicePort } from "../events/handlers/partner-categories-create.handler";
export declare class PartnerCategoriesServiceStubAdapter implements PartnerCategoriesServicePort {
    private readonly logger;
    createCreditFacilityAndCategories(): Promise<{
        credit_facility_id: number;
    }>;
}
