import { type BackofficeCreditApplicationsReadRepositoryPort, type GetBackofficeStatusCountsQuery } from "../../domain/ports/backoffice-credit-applications-read.repository.port";
import type { BackofficeCreditApplicationStatusCount } from "../../domain/models/backoffice-credit-application-status-count.model";
export declare class GetStatusCountsUseCase {
    private readonly repository;
    constructor(repository: BackofficeCreditApplicationsReadRepositoryPort);
    run(query: GetBackofficeStatusCountsQuery): Promise<BackofficeCreditApplicationStatusCount[]>;
}
