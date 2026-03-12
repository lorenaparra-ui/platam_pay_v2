import { PartnerCategory } from "@partner-categories/domain/models/partner-category.model";
import { CreatePartnerCategoryPayload, type PartnerCategoryRepositoryPort } from "@partner-categories/domain/ports/partner-category.repository.port";
export declare class CreatePartnerCategoryUseCase {
    private readonly repository;
    constructor(repository: PartnerCategoryRepositoryPort);
    execute(payload: CreatePartnerCategoryPayload): Promise<PartnerCategory | null>;
}
