import { Repository } from "typeorm";
import type { CreditApplicationCreateInput, CreditApplicationRepositoryPort, CreditApplicationUpdateInput } from "../../../modules/credit-applications/domain/ports/credit-application.repository.port";
import type { CreditApplication } from "../../../modules/credit-applications/domain/models/credit-application.model";
import { CreditApplicationEntity } from '@libs/database';
export declare class TypeOrmCreditApplicationRepository implements CreditApplicationRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<CreditApplicationEntity>);
    findAll(): Promise<CreditApplication[]>;
    findById(id: number): Promise<CreditApplication | null>;
    findByExternalId(externalId: string): Promise<CreditApplication | null>;
    create(input: CreditApplicationCreateInput): Promise<CreditApplication>;
    updateByExternalId(externalId: string, input: CreditApplicationUpdateInput): Promise<CreditApplication | null>;
    deleteByExternalId(externalId: string): Promise<boolean>;
}
