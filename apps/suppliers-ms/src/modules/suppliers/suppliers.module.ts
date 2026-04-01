import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { TypeormSupplierRepository } from '@infrastructure/database/repositories/typeorm-supplier.repository';
import { SUPPLIER_REPOSITORY } from './suppliers.tokens';
import { CreateSupplierUseCase } from './application/use-cases/create-supplier/create-supplier.use-case';
import { GetSupplierByExternalIdUseCase } from './application/use-cases/get-supplier-by-external-id/get-supplier-by-external-id.use-case';
import { ListSuppliersUseCase } from './application/use-cases/list-suppliers/list-suppliers.use-case';
import { UpdateSupplierByExternalIdUseCase } from './application/use-cases/update-supplier-by-external-id/update-supplier-by-external-id.use-case';
import { DeleteSupplierByExternalIdUseCase } from './application/use-cases/delete-supplier-by-external-id/delete-supplier-by-external-id.use-case';

@Module({
  imports: [InfrastructureModule],
  providers: [
    { provide: SUPPLIER_REPOSITORY, useExisting: TypeormSupplierRepository },
    CreateSupplierUseCase,
    GetSupplierByExternalIdUseCase,
    ListSuppliersUseCase,
    UpdateSupplierByExternalIdUseCase,
    DeleteSupplierByExternalIdUseCase,
  ],
  exports: [
    SUPPLIER_REPOSITORY,
    CreateSupplierUseCase,
    GetSupplierByExternalIdUseCase,
    ListSuppliersUseCase,
    UpdateSupplierByExternalIdUseCase,
    DeleteSupplierByExternalIdUseCase,
  ],
})
export class SuppliersModule {}
