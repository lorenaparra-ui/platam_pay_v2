import { Repository } from 'typeorm';
import { Business } from '@businesses/domain/models/business.model';
import { BusinessRepositoryPort, CreateBusinessPayload, UpdateBusinessPayload } from '@businesses/domain/ports/business.repository.port';
import { BusinessEntity } from '../entities/business.entity';
export declare class TypeOrmBusinessRepository implements BusinessRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<BusinessEntity>);
    findAll(): Promise<Business[]>;
    findById(id: number): Promise<Business | null>;
    findByExternalId(externalId: string): Promise<Business | null>;
    create(payload: CreateBusinessPayload): Promise<Business>;
    updateByExternalId(externalId: string, payload: UpdateBusinessPayload): Promise<Business | null>;
    deleteByExternalId(externalId: string): Promise<boolean>;
}
