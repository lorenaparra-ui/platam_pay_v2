import { type PartnerRepositoryPort } from "@partners/domain/ports/partner.repository.port";
export declare class DeletePartnerByExternalIdUseCase {
    private readonly repository;
    constructor(repository: PartnerRepositoryPort);
    execute(externalId: string): Promise<boolean>;
}
