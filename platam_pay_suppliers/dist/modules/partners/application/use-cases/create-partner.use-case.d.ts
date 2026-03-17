import { type CreatePartnerPayload, type PartnerRepositoryPort } from "@partners/domain/ports/partner.repository.port";
import { Partner } from "@partners/domain/models/partner.model";
export declare class CreatePartnerUseCase {
    private readonly repository;
    constructor(repository: PartnerRepositoryPort);
    execute(payload: CreatePartnerPayload): Promise<Partner>;
}
