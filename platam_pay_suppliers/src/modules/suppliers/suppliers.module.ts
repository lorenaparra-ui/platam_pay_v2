import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierEntity } from '@libs/database';
import { PurchaseOrderEntity } from '@libs/database';
import { TypeOrmSupplierRepository } from "@infrastructure/database/repositories/typeorm-supplier.repository";
import { TypeOrmPurchaseOrderRepository } from "@infrastructure/database/repositories/typeorm-purchase-order.repository";
import { SUPPLIER_REPOSITORY } from "./domain/ports/supplier.repository.port";
import { PURCHASE_ORDER_REPOSITORY } from "./domain/ports/purchase-order.repository.port";
import { SuppliersController } from "./presentation/suppliers.controller";
import { CreateSupplierUseCase } from "./application/use-cases/create-supplier.use-case";
import { FindSupplierByBusinessIdUseCase } from "./application/use-cases/find-supplier-by-business-id.use-case";
import { CreatePurchaseOrderUseCase } from "./application/use-cases/create-purchase-order.use-case";

@Module({
  imports: [
    TypeOrmModule.forFeature([SupplierEntity, PurchaseOrderEntity]),
  ],
  controllers: [SuppliersController],
  providers: [
    {
      provide: SUPPLIER_REPOSITORY,
      useClass: TypeOrmSupplierRepository,
    },
    {
      provide: PURCHASE_ORDER_REPOSITORY,
      useClass: TypeOrmPurchaseOrderRepository,
    },
    CreateSupplierUseCase,
    FindSupplierByBusinessIdUseCase,
    CreatePurchaseOrderUseCase,
  ],
  exports: [
    SUPPLIER_REPOSITORY,
    PURCHASE_ORDER_REPOSITORY,
    CreateSupplierUseCase,
    FindSupplierByBusinessIdUseCase,
    CreatePurchaseOrderUseCase,
  ],
})
export class SuppliersModule {}
