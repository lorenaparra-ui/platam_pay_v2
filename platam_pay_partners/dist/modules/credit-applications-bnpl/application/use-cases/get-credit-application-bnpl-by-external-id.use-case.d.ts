import type { CreditApplicationBnplRepositoryPort } from "../../domain/ports/credit-application-bnpl.repository.port";
import { CreditApplicationBnplResponseDto } from "../dto/credit-application-bnpl-response.dto";
export declare class GetCreditApplicationBnplByExternalIdUseCase {
    private readonly repository;
    constructor(repository: CreditApplicationBnplRepositoryPort);
    execute(externalId: string): Promise<CreditApplicationBnplResponseDto | null>;
}
