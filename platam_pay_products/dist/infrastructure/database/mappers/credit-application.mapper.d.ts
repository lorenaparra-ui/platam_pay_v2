import type { CreditApplication } from "../../../modules/credit-applications/domain/models/credit-application.model";
import type { CreditApplicationCreateInput } from "../../../modules/credit-applications/domain/ports/credit-application.repository.port";
import { CreditApplicationEntity } from "../entities/credit-application.entity";
export declare class CreditApplicationMapper {
    static toDomain(entity: CreditApplicationEntity): CreditApplication;
    static toEntity(domain: CreditApplication): CreditApplicationEntity;
    static toEntityFromCreateInput(input: CreditApplicationCreateInput): CreditApplicationEntity;
}
