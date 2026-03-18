import type { CreditApplicationRepositoryPort } from "../../domain/ports/credit-application.repository.port";
import type { CreditApplication } from "../../domain/models/credit-application.model";
import type { CreateCreditApplicationRequestDto } from "../dto/create-credit-application-request.dto";
export declare class CreateCreditApplicationUseCase {
    private readonly repository;
    constructor(repository: CreditApplicationRepositoryPort);
    run(dto: CreateCreditApplicationRequestDto): Promise<CreditApplication>;
}
