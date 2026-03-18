import { Injectable } from "@nestjs/common";
import type { CreatePurchaseOrderPayload } from "../../domain/ports/purchase-order.repository.port";
import type { PurchaseOrderRepositoryPort } from "../../domain/ports/purchase-order.repository.port";
import { PURCHASE_ORDER_REPOSITORY } from "../../domain/ports/purchase-order.repository.port";
import { Inject } from "@nestjs/common";
import { PurchaseOrder } from "../../domain/models/purchase-order.model";

@Injectable()
export class CreatePurchaseOrderUseCase {
  constructor(
    @Inject(PURCHASE_ORDER_REPOSITORY)
    private readonly repository: PurchaseOrderRepositoryPort
  ) {}

  async execute(payload: CreatePurchaseOrderPayload): Promise<PurchaseOrder> {
    return this.repository.create(payload);
  }
}
