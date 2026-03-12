import type { CreditApplicationBnplRepositoryPort } from "../../domain/ports/credit-application-bnpl.repository.port";
import { CreditApplicationBnplResponseDto } from "../dto/credit-application-bnpl-response.dto";
import { UpdateCreditApplicationBnplRequestDto } from "../dto/update-credit-application-bnpl-request.dto";
export declare class UpdateCreditApplicationBnplUseCase {
    private readonly repository;
    constructor(repository: CreditApplicationBnplRepositoryPort);
    execute(externalId: string, dto: UpdateCreditApplicationBnplRequestDto): Promise<CreditApplicationBnplResponseDto | null>;
}
