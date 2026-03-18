import { DataSource } from "typeorm";
import type { CreditFacilityRepositoryPort, CreateCreditFacilityWithCategoriesInput } from "../../../modules/credit-facilities/domain/ports/credit-facility.repository.port";
import type { CreditFacility } from "../../../modules/credit-facilities/domain/models/credit-facility.model";
export declare class TypeOrmCreditFacilityRepository implements CreditFacilityRepositoryPort {
    private readonly data_source;
    constructor(data_source: DataSource);
    create_with_categories(input: CreateCreditFacilityWithCategoriesInput): Promise<CreditFacility>;
}
