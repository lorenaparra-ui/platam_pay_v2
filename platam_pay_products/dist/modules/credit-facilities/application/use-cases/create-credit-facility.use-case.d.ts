import type { CreditFacilityRepositoryPort } from "../../domain/ports/credit-facility.repository.port";
import { type CreateCreditFacilityInput } from "../../domain/ports/credit-facility.repository.port";
import type { CreditFacility } from "../../domain/models/credit-facility.model";
export declare class CreateCreditFacilityUseCase {
    private readonly repository;
    constructor(repository: CreditFacilityRepositoryPort);
    run(input: CreateCreditFacilityInput): Promise<CreditFacility>;
}
