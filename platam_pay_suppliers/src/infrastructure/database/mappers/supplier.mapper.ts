import { Supplier } from "@suppliers/domain/models/supplier.model";
import type { CreateSupplierPayload } from "@suppliers/domain/ports/supplier.repository.port";
import { SupplierEntity } from "../entities/supplier.entity";

export class SupplierMapper {
  static toDomain(entity: SupplierEntity): Supplier {
    return {
      id: entity.id,
      externalId: entity.externalId,
      businessId: entity.businessId,
      bankAccount: entity.bankAccount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toCreateEntity(payload: CreateSupplierPayload): Partial<SupplierEntity> {
    const entity = new SupplierEntity();
    entity.businessId = payload.businessId;
    entity.bankAccount = payload.bankAccount ?? null;
    return entity;
  }
}
