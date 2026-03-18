import { PurchaseOrder } from "@suppliers/domain/models/purchase-order.model";
import type { CreatePurchaseOrderPayload } from "@suppliers/domain/ports/purchase-order.repository.port";
import { PurchaseOrderEntity } from '@libs/database';
export declare class PurchaseOrderMapper {
    static toDomain(entity: PurchaseOrderEntity): PurchaseOrder;
    static toCreateEntity(payload: CreatePurchaseOrderPayload): Partial<PurchaseOrderEntity>;
}
