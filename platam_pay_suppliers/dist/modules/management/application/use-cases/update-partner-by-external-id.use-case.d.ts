import { type PartnerRepositoryPort, type UpdatePartnerPayload } from "@partners/domain/ports/partner.repository.port";
import { Partner } from "@partners/domain/models/partner.model";
export declare class UpdatePartnerByExternalIdUseCase {
    private readonly repository;
    constructor(repository: PartnerRepositoryPort);
    execute(externalId: string, payload: UpdatePartnerPayload): Promise<Partner | null>;
}
