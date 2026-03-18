import type { CreditApplicationRepositoryPort } from "../../domain/ports/credit-application.repository.port";
import type { CreditApplication } from "../../domain/models/credit-application.model";
export declare class GetCreditApplicationByExternalIdUseCase {
    private readonly repository;
    constructor(repository: CreditApplicationRepositoryPort);
    run(externalId: string): Promise<CreditApplication | null>;
}
