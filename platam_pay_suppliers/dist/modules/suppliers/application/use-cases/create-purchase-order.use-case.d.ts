import type { CreatePurchaseOrderPayload } from "../../domain/ports/purchase-order.repository.port";
import type { PurchaseOrderRepositoryPort } from "../../domain/ports/purchase-order.repository.port";
import { PurchaseOrder } from "../../domain/models/purchase-order.model";
export declare class CreatePurchaseOrderUseCase {
    private readonly repository;
    constructor(repository: PurchaseOrderRepositoryPort);
    execute(payload: CreatePurchaseOrderPayload): Promise<PurchaseOrder>;
}
