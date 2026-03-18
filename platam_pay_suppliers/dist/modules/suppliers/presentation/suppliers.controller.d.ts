import { CreateSupplierUseCase } from "../application/use-cases/create-supplier.use-case";
import { FindSupplierByBusinessIdUseCase } from "../application/use-cases/find-supplier-by-business-id.use-case";
import { CreatePurchaseOrderUseCase } from "../application/use-cases/create-purchase-order.use-case";
import { CreateSupplierRequestDto } from "../application/dto/create-supplier-request.dto";
import { CreatePurchaseOrderRequestDto } from "../application/dto/create-purchase-order-request.dto";
export declare class SuppliersController {
    private readonly createSupplierUseCase;
    private readonly findSupplierByBusinessIdUseCase;
    private readonly createPurchaseOrderUseCase;
    constructor(createSupplierUseCase: CreateSupplierUseCase, findSupplierByBusinessIdUseCase: FindSupplierByBusinessIdUseCase, createPurchaseOrderUseCase: CreatePurchaseOrderUseCase);
    create(dto: CreateSupplierRequestDto): Promise<import("../domain/models/supplier.model").Supplier>;
    findByBusinessId(businessId: string): Promise<import("../domain/models/supplier.model").Supplier | null>;
    createPurchaseOrder(dto: CreatePurchaseOrderRequestDto): Promise<import("../domain/models/purchase-order.model").PurchaseOrder>;
}
