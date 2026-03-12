import { type PartnerCategoryRepositoryPort } from "@partner-categories/domain/ports/partner-category.repository.port";
export declare class DeletePartnerCategoryByExternalIdUseCase {
    private readonly repository;
    constructor(repository: PartnerCategoryRepositoryPort);
    execute(externalId: string): Promise<boolean>;
}
