import { Repository } from "typeorm";
import { Supplier } from "@suppliers/domain/models/supplier.model";
import { CreateSupplierPayload, SupplierRepositoryPort, UpdateSupplierPayload } from "@suppliers/domain/ports/supplier.repository.port";
import { SupplierEntity } from '@libs/database';
export declare class TypeOrmSupplierRepository implements SupplierRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<SupplierEntity>);
    findAll(): Promise<Supplier[]>;
    findById(id: number): Promise<Supplier | null>;
    findByExternalId(externalId: string): Promise<Supplier | null>;
    findByBusinessId(businessId: number): Promise<Supplier | null>;
    create(payload: CreateSupplierPayload): Promise<Supplier>;
    updateByExternalId(externalId: string, payload: UpdateSupplierPayload): Promise<Supplier | null>;
    deleteByExternalId(externalId: string): Promise<boolean>;
}
