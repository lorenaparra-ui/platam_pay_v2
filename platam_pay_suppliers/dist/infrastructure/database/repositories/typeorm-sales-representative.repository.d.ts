import { Repository } from 'typeorm';
import type { CreateSalesRepresentativePayload, SalesRepresentativeRepositoryPort } from '@sales-representatives/domain/ports/sales-representative.repository.port';
import { SalesRepresentative } from '@sales-representatives/domain/models/sales-representative.model';
import { SalesRepresentativeEntity } from '@libs/database';
export declare class TypeOrmSalesRepresentativeRepository implements SalesRepresentativeRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<SalesRepresentativeEntity>);
    findAll(): Promise<SalesRepresentative[]>;
    findById(id: number): Promise<SalesRepresentative | null>;
    findByExternalId(externalId: string): Promise<SalesRepresentative | null>;
    findByPartnerId(partnerId: number): Promise<SalesRepresentative[]>;
    findByUserId(userId: number): Promise<SalesRepresentative | null>;
    create(payload: CreateSalesRepresentativePayload): Promise<SalesRepresentative>;
}
