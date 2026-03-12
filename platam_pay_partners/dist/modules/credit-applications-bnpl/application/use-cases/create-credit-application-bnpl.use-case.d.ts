import type { CreditApplicationBnplRepositoryPort } from "../../domain/ports/credit-application-bnpl.repository.port";
import { CreditApplicationBnplResponseDto } from "../dto/credit-application-bnpl-response.dto";
import { CreateCreditApplicationBnplRequestDto } from "../dto/create-credit-application-bnpl-request.dto";
export declare class CreateCreditApplicationBnplUseCase {
    private readonly repository;
    constructor(repository: CreditApplicationBnplRepositoryPort);
    execute(dto: CreateCreditApplicationBnplRequestDto): Promise<CreditApplicationBnplResponseDto>;
}
