import { Repository } from "typeorm";
import type { BusinessRepositoryPort } from "../../../modules/businesses/domain/ports/business.repository.port";
import type { Business } from "../../../modules/businesses/domain/models/business.model";
import { BusinessEntity } from "../entities/business.entity";
export declare class TypeOrmBusinessRepository implements BusinessRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<BusinessEntity>);
    findAll(): Promise<Business[]>;
    findById(id: number): Promise<Business | null>;
    findByExternalId(externalId: string): Promise<Business | null>;
}
