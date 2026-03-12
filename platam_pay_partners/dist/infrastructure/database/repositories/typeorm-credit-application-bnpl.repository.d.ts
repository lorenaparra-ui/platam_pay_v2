import { Repository } from "typeorm";
import { CreditApplicationBnpl } from "@credit-applications-bnpl/domain/models/credit-application-bnpl.model";
import { CreateCreditApplicationBnplPayload, CreditApplicationBnplRepositoryPort, UpdateCreditApplicationBnplPayload } from "@credit-applications-bnpl/domain/ports/credit-application-bnpl.repository.port";
import { CreditApplicationBnplEntity } from "../entities/credit-application-bnpl.entity";
export declare class TypeOrmCreditApplicationBnplRepository implements CreditApplicationBnplRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<CreditApplicationBnplEntity>);
    findAll(): Promise<CreditApplicationBnpl[]>;
    findById(id: number): Promise<CreditApplicationBnpl | null>;
    findByExternalId(externalId: string): Promise<CreditApplicationBnpl | null>;
    create(payload: CreateCreditApplicationBnplPayload): Promise<CreditApplicationBnpl>;
    updateByExternalId(externalId: string, payload: UpdateCreditApplicationBnplPayload): Promise<CreditApplicationBnpl | null>;
    deleteByExternalId(externalId: string): Promise<boolean>;
}
