import { PartnerCategory } from "@partner-categories/domain/models/partner-category.model";
import { type PartnerCategoryRepositoryPort } from "@partner-categories/domain/ports/partner-category.repository.port";
export declare class FindCategoriesByPartnerUseCase {
    private readonly repository;
    constructor(repository: PartnerCategoryRepositoryPort);
    execute(partnerExternalId: string): Promise<PartnerCategory[]>;
}
