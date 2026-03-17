import { type BackofficeCreditApplicationsReadRepositoryPort, type ListBackofficeCreditApplicationsQuery } from "../../domain/ports/backoffice-credit-applications-read.repository.port";
import type { BackofficeCreditApplicationsPage } from "../../domain/models/backoffice-credit-applications-page.model";
export declare class ListCreditApplicationsUseCase {
    private readonly repository;
    constructor(repository: BackofficeCreditApplicationsReadRepositoryPort);
    run(query: ListBackofficeCreditApplicationsQuery): Promise<BackofficeCreditApplicationsPage>;
}
