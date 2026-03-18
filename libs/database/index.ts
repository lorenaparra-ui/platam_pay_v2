/**
 * Barrel: entidades TypeORM compartidas (única fuente para migraciones y microservicios).
 */
export { BaseExternalIdEntity } from "./entities/base-external-id.entity";
export { UserEntity } from "./entities/user.entity";
export { PersonEntity } from "./entities/person.entity";
export { GuarantorEntity } from "./entities/guarantor.entity";
export { RolePermissionEntity } from "./entities/role-permission.entity";
export { LegalRepresentativeEntity } from "./entities/legal-representative.entity";
export { PermissionEntity } from "./entities/permission.entity";
export { DocumentTypeEntity } from "./entities/document-type.entity";
export { ContractSignerEntity } from "./entities/contract-signer.entity";
export { CityEntity } from "./entities/city.entity";
export { OnboardingEntity } from "./entities/onboarding.entity";
export { BusinessSeniorityEntity } from "./entities/business-seniority.entity";
export { ShareholderEntity } from "./entities/shareholder.entity";
export { SalesRepresentativeEntity } from "./entities/sales-representative.entity";
export { StatusEntity } from "./entities/status.entity";
export { BusinessEntity } from "./entities/business.entity";
export { PartnersEntity } from "./entities/partners.entity";
export { SupplierEntity } from "./entities/supplier.entity";
export { PurchaseOrderEntity } from "./entities/order.entity";
export { CreditFacilityEntity } from "./entities/credit-facility.entity";
export { CategoryEntity } from "./entities/category.entity";
export { CreditApplicationEntity } from "./entities/credit-application.entity";


import { UserEntity } from "./entities/user.entity";
import { PersonEntity } from "./entities/person.entity";
import { GuarantorEntity } from "./entities/guarantor.entity";
import { RolePermissionEntity } from "./entities/role-permission.entity";
import { LegalRepresentativeEntity } from "./entities/legal-representative.entity";
import { PermissionEntity } from "./entities/permission.entity";
import { DocumentTypeEntity } from "./entities/document-type.entity";
import { ContractSignerEntity } from "./entities/contract-signer.entity";
import { CityEntity } from "./entities/city.entity";
import { OnboardingEntity } from "./entities/onboarding.entity";
import { BusinessSeniorityEntity } from "./entities/business-seniority.entity";
import { ShareholderEntity } from "./entities/shareholder.entity";
import { SalesRepresentativeEntity } from "./entities/sales-representative.entity";
import { StatusEntity } from "./entities/status.entity";
import { BusinessEntity } from "./entities/business.entity";
import { PartnersEntity } from "./entities/partners.entity";
import { SupplierEntity } from "./entities/supplier.entity";
import { PurchaseOrderEntity } from "./entities/order.entity";
import { CreditFacilityEntity } from "./entities/credit-facility.entity";
import { CategoryEntity } from "./entities/category.entity";
import { CreditApplicationEntity } from "./entities/credit-application.entity";
/** Registro único para DataSource (migrations-runner) y TypeOrmModule.forRoot. */
export const DATABASE_ENTITIES: (new () => unknown)[] = [
  UserEntity,
  PersonEntity,
  GuarantorEntity,
  RolePermissionEntity,
  LegalRepresentativeEntity,
  PermissionEntity,
  DocumentTypeEntity,
  ContractSignerEntity,
  CityEntity,
  OnboardingEntity,
  BusinessSeniorityEntity,
  ShareholderEntity,
  SalesRepresentativeEntity,
  StatusEntity,
  BusinessEntity,
  PartnersEntity,
  SupplierEntity,
  PurchaseOrderEntity,
  CreditFacilityEntity,
  CategoryEntity,
  CreditApplicationEntity,
];
