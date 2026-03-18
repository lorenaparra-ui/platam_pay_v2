import type { CreditApplicationRepositoryPort } from "../../domain/ports/credit-application.repository.port";
import type { CreditApplication } from "../../domain/models/credit-application.model";
import type { UpdateCreditApplicationRequestDto } from "../dto/update-credit-application-request.dto";
export declare class UpdateCreditApplicationUseCase {
    private readonly repository;
    constructor(repository: CreditApplicationRepositoryPort);
    run(externalId: string, dto: UpdateCreditApplicationRequestDto): Promise<CreditApplication | null>;
}
