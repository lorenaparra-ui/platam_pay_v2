import { Supplier } from "@suppliers/domain/models/supplier.model";
import type { CreateSupplierPayload } from "@suppliers/domain/ports/supplier.repository.port";
import { SupplierEntity } from "../entities/supplier.entity";
export declare class SupplierMapper {
    static toDomain(entity: SupplierEntity): Supplier;
    static toCreateEntity(payload: CreateSupplierPayload): Partial<SupplierEntity>;
}
