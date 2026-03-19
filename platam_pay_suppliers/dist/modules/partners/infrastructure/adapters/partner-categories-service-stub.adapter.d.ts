import type { PartnerCategoriesServicePort } from "@partners/application/ports/partner-categories-service.port";
export declare class PartnerCategoriesServiceStubAdapter implements PartnerCategoriesServicePort {
    private readonly logger;
    createCreditFacilityAndCategories(): Promise<{
        credit_facility_id: number;
    }>;
}
