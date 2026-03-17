import type { CreditApplicationBnpl } from "../../../modules/credit-applications/domain/models/credit-application-bnpl.model";
import type { CreditApplicationBnplCreateInput } from "../../../modules/credit-applications/domain/ports/credit-application-bnpl.repository.port";
import { CreditApplicationBnplEntity } from "../entities/credit-application-bnpl.entity";
export declare class CreditApplicationBnplMapper {
    static toDomain(entity: CreditApplicationBnplEntity): CreditApplicationBnpl;
    static toEntity(domain: CreditApplicationBnpl): CreditApplicationBnplEntity;
    static toEntityFromCreateInput(input: CreditApplicationBnplCreateInput): CreditApplicationBnplEntity;
}
