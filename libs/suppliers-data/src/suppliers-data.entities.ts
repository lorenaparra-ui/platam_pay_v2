import { BankAccountEntity } from './entities/bank-account.entity';
import { BusinessEntity } from './entities/business.entity';
import { BusinessSeniorityEntity } from './entities/business-seniority.entity';
import { LegalRepresentativeEntity } from './entities/legal-representative.entity';
import { PartnersEntity } from './entities/partner.entity';
import { PurchaseOrderEntity } from './entities/order.entity';
import { SalesRepresentativeEntity } from './entities/sales-representative.entity';
import { ShareholderEntity } from './entities/shareholder.entity';
import { SupplierEntity } from './entities/supplier.entity';
import { PartnerOnboardingSagaEntity } from './entities/partner-onboarding-saga.entity';

/** Lista de entidades TypeORM (sin Nest); usada por `SuppliersDataModule` y por la CLI de migraciones. */
export const SUPPLIERS_DATA_ENTITIES = [
  BankAccountEntity,
  BusinessEntity,
  BusinessSeniorityEntity,
  LegalRepresentativeEntity,
  PartnersEntity,
  PartnerOnboardingSagaEntity,
  PurchaseOrderEntity,
  SalesRepresentativeEntity,
  ShareholderEntity,
  SupplierEntity,
] as const;
