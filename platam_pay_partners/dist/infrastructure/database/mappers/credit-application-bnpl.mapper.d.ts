import { CreditApplicationBnpl } from "@credit-applications-bnpl/domain/models/credit-application-bnpl.model";
import { CreateCreditApplicationBnplPayload, UpdateCreditApplicationBnplPayload } from "@credit-applications-bnpl/domain/ports/credit-application-bnpl.repository.port";
import { CreditApplicationBnplEntity } from "../entities/credit-application-bnpl.entity";
export declare class CreditApplicationBnplMapper {
    static toDomain(entity: CreditApplicationBnplEntity): CreditApplicationBnpl;
    static toCreateEntity(payload: CreateCreditApplicationBnplPayload): CreditApplicationBnplEntity;
    static applyUpdate(entity: CreditApplicationBnplEntity, payload: UpdateCreditApplicationBnplPayload): CreditApplicationBnplEntity;
    private static applyPayload;
}
