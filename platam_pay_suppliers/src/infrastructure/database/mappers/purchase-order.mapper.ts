import { PurchaseOrder } from "@suppliers/domain/models/purchase-order.model";
import type { CreatePurchaseOrderPayload } from "@suppliers/domain/ports/purchase-order.repository.port";
import { PurchaseOrderEntity } from "../entities/purchase-order.entity";

export class PurchaseOrderMapper {
  static toDomain(entity: PurchaseOrderEntity): PurchaseOrder {
    return {
      id: entity.id,
      externalId: entity.externalId,
      userId: entity.userId,
      supplierId: entity.supplierId,
      amount: entity.amount,
      documentUrl: entity.documentUrl,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toCreateEntity(
    payload: CreatePurchaseOrderPayload
  ): Partial<PurchaseOrderEntity> {
    const entity = new PurchaseOrderEntity();
    entity.userId = payload.userId;
    entity.supplierId = payload.supplierId;
    entity.amount = payload.amount;
    entity.documentUrl = payload.documentUrl ?? null;
    return entity;
  }
}
