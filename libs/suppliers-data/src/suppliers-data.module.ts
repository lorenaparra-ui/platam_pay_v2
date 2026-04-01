import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountEntity } from './entities/bank-account.entity';
import { BusinessEntity } from './entities/business.entity';
import { BusinessSeniorityEntity } from './entities/business-seniority.entity';
import { LegalRepresentativeEntity } from './entities/legal-representative.entity';
import { PartnersEntity } from './entities/partners.entity';
import { PurchaseOrderEntity } from './entities/order.entity';
import { SalesRepresentativeEntity } from './entities/sales-representative.entity';
import { SupplierEntity } from './entities/supplier.entity';
import { PartnerOnboardingSagaEntity } from './entities/partner-onboarding-saga.entity';
import { SuppliersDataService } from './suppliers-data.service';

export const SUPPLIERS_DATA_ENTITIES = [
  BankAccountEntity,
  BusinessEntity,
  BusinessSeniorityEntity,
  LegalRepresentativeEntity,
  PartnersEntity,
  PartnerOnboardingSagaEntity,
  PurchaseOrderEntity,
  SalesRepresentativeEntity,
  SupplierEntity,
] as const;

@Module({
  imports: [TypeOrmModule.forFeature([...SUPPLIERS_DATA_ENTITIES])],
  providers: [SuppliersDataService],
  exports: [TypeOrmModule, SuppliersDataService],
})
export class SuppliersDataModule {}
