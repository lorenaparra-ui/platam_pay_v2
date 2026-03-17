import { type BackofficeCreditApplicationsReadRepositoryPort, type ListBackofficeActivePartnersQuery } from "../../domain/ports/backoffice-credit-applications-read.repository.port";
import type { BackofficeActivePartner } from "../../domain/models/backoffice-active-partner.model";
export declare class ListActivePartnersUseCase {
    private readonly repository;
    constructor(repository: BackofficeCreditApplicationsReadRepositoryPort);
    run(query: ListBackofficeActivePartnersQuery): Promise<BackofficeActivePartner[]>;
}
