import type { CreditApplicationBnplRepositoryPort } from "../../domain/ports/credit-application-bnpl.repository.port";
export declare class DeleteCreditApplicationBnplUseCase {
    private readonly repository;
    constructor(repository: CreditApplicationBnplRepositoryPort);
    run(externalId: string): Promise<boolean>;
}
