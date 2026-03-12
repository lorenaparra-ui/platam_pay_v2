import { Repository } from 'typeorm';
import type { CreditApplicationBnplCreateInput, CreditApplicationBnplRepositoryPort, CreditApplicationBnplUpdateInput } from '../../../modules/credit-applications/domain/ports/credit-application-bnpl.repository.port';
import type { CreditApplicationBnpl } from '../../../modules/credit-applications/domain/models/credit-application-bnpl.model';
import { CreditApplicationBnplEntity } from '../entities/credit-application-bnpl.entity';
export declare class TypeOrmCreditApplicationBnplRepository implements CreditApplicationBnplRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<CreditApplicationBnplEntity>);
    findAll(): Promise<CreditApplicationBnpl[]>;
    findById(id: number): Promise<CreditApplicationBnpl | null>;
    findByExternalId(externalId: string): Promise<CreditApplicationBnpl | null>;
    create(input: CreditApplicationBnplCreateInput): Promise<CreditApplicationBnpl>;
    updateByExternalId(externalId: string, input: CreditApplicationBnplUpdateInput): Promise<CreditApplicationBnpl | null>;
    deleteByExternalId(externalId: string): Promise<boolean>;
}
