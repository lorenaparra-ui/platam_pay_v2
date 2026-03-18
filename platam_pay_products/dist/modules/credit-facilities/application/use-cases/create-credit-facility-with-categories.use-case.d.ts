import type { CreditFacilityRepositoryPort } from "../../domain/ports/credit-facility.repository.port";
import { type CreateCreditFacilityWithCategoriesInput } from "../../domain/ports/credit-facility.repository.port";
import type { CreditFacility } from "../../domain/models/credit-facility.model";
export declare class CreateCreditFacilityWithCategoriesUseCase {
    private readonly repository;
    constructor(repository: CreditFacilityRepositoryPort);
    run(input: CreateCreditFacilityWithCategoriesInput): Promise<CreditFacility>;
}
