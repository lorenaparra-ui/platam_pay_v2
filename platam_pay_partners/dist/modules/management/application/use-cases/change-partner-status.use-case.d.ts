import { type PartnerRepositoryPort, type PartnerStatusCode } from "@partners/domain/ports/partner.repository.port";
import { Partner } from "@partners/domain/models/partner.model";
export declare class ChangePartnerStatusUseCase {
    private readonly repository;
    constructor(repository: PartnerRepositoryPort);
    execute(externalId: string, statusCode: PartnerStatusCode): Promise<Partner | null>;
}
