import { Repository } from "typeorm";
import { PurchaseOrder } from "@suppliers/domain/models/purchase-order.model";
import { CreatePurchaseOrderPayload, PurchaseOrderRepositoryPort } from "@suppliers/domain/ports/purchase-order.repository.port";
import { PurchaseOrderEntity } from "../entities/purchase-order.entity";
export declare class TypeOrmPurchaseOrderRepository implements PurchaseOrderRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<PurchaseOrderEntity>);
    findAll(): Promise<PurchaseOrder[]>;
    findById(id: number): Promise<PurchaseOrder | null>;
    findByExternalId(externalId: string): Promise<PurchaseOrder | null>;
    findBySupplierId(supplierId: number): Promise<PurchaseOrder[]>;
    create(payload: CreatePurchaseOrderPayload): Promise<PurchaseOrder>;
}
