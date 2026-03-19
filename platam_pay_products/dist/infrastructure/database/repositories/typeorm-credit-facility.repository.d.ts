import { Repository } from "typeorm";
import { CreditFacilityEntity } from "@libs/database";
import type { CreditFacilityRepositoryPort, CreateCreditFacilityInput } from "../../../modules/credit-facilities/domain/ports/credit-facility.repository.port";
import type { CreditFacility } from "../../../modules/credit-facilities/domain/models/credit-facility.model";
export declare class TypeOrmCreditFacilityRepository implements CreditFacilityRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<CreditFacilityEntity>);
    create(input: CreateCreditFacilityInput): Promise<CreditFacility>;
}
