import type { CreditApplicationBnplRepositoryPort } from "../../domain/ports/credit-application-bnpl.repository.port";
import { CreditApplicationBnplResponseDto } from "../dto/credit-application-bnpl-response.dto";
export declare class ListCreditApplicationsBnplUseCase {
    private readonly repository;
    constructor(repository: CreditApplicationBnplRepositoryPort);
    execute(): Promise<CreditApplicationBnplResponseDto[]>;
}
