import { PartnerCategory } from "@partner-categories/domain/models/partner-category.model";
import { type PartnerCategoryRepositoryPort, type UpdatePartnerCategoryPayload } from "@partner-categories/domain/ports/partner-category.repository.port";
export declare class UpdatePartnerCategoryByExternalIdUseCase {
    private readonly repository;
    constructor(repository: PartnerCategoryRepositoryPort);
    execute(externalId: string, payload: UpdatePartnerCategoryPayload): Promise<PartnerCategory | null>;
}
