import { type PartnerRepositoryPort } from "@partners/domain/ports/partner.repository.port";
import { Partner } from "@partners/domain/models/partner.model";
export declare class FindAllPartnersUseCase {
    private readonly repository;
    constructor(repository: PartnerRepositoryPort);
    execute(search?: string): Promise<Partner[]>;
}
