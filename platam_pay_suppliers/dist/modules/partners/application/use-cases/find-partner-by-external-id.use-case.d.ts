import { type PartnerRepositoryPort } from "@partners/domain/ports/partner.repository.port";
import { Partner } from "@partners/domain/models/partner.model";
export declare class FindPartnerByExternalIdUseCase {
    private readonly repository;
    constructor(repository: PartnerRepositoryPort);
    execute(externalId: string): Promise<Partner | null>;
}
