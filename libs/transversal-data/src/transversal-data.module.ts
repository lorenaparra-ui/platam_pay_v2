import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessSeniorityEntity } from './entities/business-seniority.entity';
import { CityEntity } from './entities/city.entity';
import { ContractSignerEntity } from './entities/contract-signer.entity';
import { CurrencyEntity } from './entities/currency.entity';
import { DocumentTypeEntity } from './entities/document-type.entity';
import { GuarantorEntity } from './entities/guarantor.entity';
import { LegalRepresentativeEntity } from './entities/legal-representative.entity';
import { PermissionEntity } from './entities/permission.entity';
import { PersonEntity } from './entities/person.entity';
import { RoleEntity } from './entities/role.entity';
import { RolePermissionEntity } from './entities/role-permission.entity';
import { ShareholderEntity } from './entities/shareholder.entity';
import { StatusEntity } from './entities/status.entity';
import { PartnerCreateUserSqsIdempotencyEntity } from './entities/partner-create-user-sqs-idempotency.entity';
import { UploadFilesIdempotencyEntity } from './entities/upload-files-idempotency.entity';
import { UserEntity } from './entities/user.entity';
import { TransversalDataService } from './transversal-data.service';

/** Entidades TypeORM concretas del dominio transversal (excluye la base abstracta). */
export const TRANSVERSAL_DATA_ENTITIES = [
  BusinessSeniorityEntity,
  CityEntity,
  ContractSignerEntity,
  CurrencyEntity,
  DocumentTypeEntity,
  GuarantorEntity,
  LegalRepresentativeEntity,
  PermissionEntity,
  PersonEntity,
  RoleEntity,
  RolePermissionEntity,
  ShareholderEntity,
  StatusEntity,
  UploadFilesIdempotencyEntity,
  PartnerCreateUserSqsIdempotencyEntity,
  UserEntity,
] as const;

@Module({
  imports: [TypeOrmModule.forFeature([...TRANSVERSAL_DATA_ENTITIES])],
  providers: [TransversalDataService],
  exports: [TypeOrmModule, TransversalDataService],
})
export class TransversalDataModule {}
