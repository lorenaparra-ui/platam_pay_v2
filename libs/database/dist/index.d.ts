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
export { CategoryEntity } from "./entities/product.entity";
export { CreditApplicationEntity } from "./entities/credit-application.entity";
/** Registro único para DataSource (migrations-runner) y TypeOrmModule.forRoot. */
export declare const DATABASE_ENTITIES: (new () => unknown)[];
