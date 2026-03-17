import type { CreditApplicationBnplRepositoryPort } from "../../domain/ports/credit-application-bnpl.repository.port";
import type { CreditApplicationBnpl } from "../../domain/models/credit-application-bnpl.model";
export declare class GetAllCreditApplicationsBnplUseCase {
    private readonly repository;
    constructor(repository: CreditApplicationBnplRepositoryPort);
    run(): Promise<CreditApplicationBnpl[]>;
}
