import type { CreditApplicationRepositoryPort } from "../../domain/ports/credit-application.repository.port";
export declare class DeleteCreditApplicationUseCase {
    private readonly repository;
    constructor(repository: CreditApplicationRepositoryPort);
    run(externalId: string): Promise<boolean>;
}
