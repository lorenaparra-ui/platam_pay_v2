import type { CreditApplicationRepositoryPort } from "../../domain/ports/credit-application.repository.port";
import type { CreditApplication } from "../../domain/models/credit-application.model";
export declare class GetAllCreditApplicationsUseCase {
    private readonly repository;
    constructor(repository: CreditApplicationRepositoryPort);
    run(): Promise<CreditApplication[]>;
}
