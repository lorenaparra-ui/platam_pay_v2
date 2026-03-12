import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from '@infrastructure/database/entities/person.entity';
import { LegalRepresentativeEntity } from '@infrastructure/database/entities/legal-representative.entity';
import { ShareholderEntity } from '@infrastructure/database/entities/shareholder.entity';
import { GuarantorEntity } from '@infrastructure/database/entities/guarantor.entity';
import { SalesRepresentativeEntity } from '@infrastructure/database/entities/sales-representative.entity';
import { ContractSignerEntity } from '@infrastructure/database/entities/contract-signer.entity';
import { TypeOrmPersonRepository } from '@infrastructure/database/repositories/typeorm-person.repository';
import { TypeOrmLegalRepresentativeRepository } from '@infrastructure/database/repositories/typeorm-legal-representative.repository';
import { TypeOrmShareholderRepository } from '@infrastructure/database/repositories/typeorm-shareholder.repository';
import { TypeOrmGuarantorRepository } from '@infrastructure/database/repositories/typeorm-guarantor.repository';
import { TypeOrmSalesRepresentativeRepository } from '@infrastructure/database/repositories/typeorm-sales-representative.repository';
import { TypeOrmContractSignerRepository } from '@infrastructure/database/repositories/typeorm-contract-signer.repository';
import { PERSONS_REPOSITORY } from './domain/ports/person.repository.port';
import { LEGAL_REPRESENTATIVE_REPOSITORY } from './domain/ports/legal-representative.repository.port';
import { SHAREHOLDER_REPOSITORY } from './domain/ports/shareholder.repository.port';
import { GUARANTOR_REPOSITORY } from './domain/ports/guarantor.repository.port';
import { SALES_REPRESENTATIVE_REPOSITORY } from './domain/ports/sales-representative.repository.port';
import { CONTRACT_SIGNER_REPOSITORY } from './domain/ports/contract-signer.repository.port';
import { PersonsController } from './presentation/persons.controller';
import { GetPersonsUseCase } from './application/use-cases/person/get-persons.use-case';
import { GetPersonByExternalIdUseCase } from './application/use-cases/person/get-person-by-external-id.use-case';
import { CreatePersonUseCase } from './application/use-cases/person/create-person.use-case';
import { CreateLegalRepresentativeUseCase } from './application/use-cases/legal-representative/create-legal-representative.use-case';
import { CreateShareholderUseCase } from './application/use-cases/shareholder/create-shareholder.use-case';
import { CreateGuarantorUseCase } from './application/use-cases/guarantor/create-guarantor.use-case';
import { CreateSalesRepresentativeUseCase } from './application/use-cases/sales-representative/create-sales-representative.use-case';
import { CreateContractSignerUseCase } from './application/use-cases/contract-signer/create-contract-signer.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PersonEntity,
      LegalRepresentativeEntity,
      ShareholderEntity,
      GuarantorEntity,
      SalesRepresentativeEntity,
      ContractSignerEntity,
    ]),
  ],
  controllers: [PersonsController],
  providers: [
    { provide: PERSONS_REPOSITORY, useClass: TypeOrmPersonRepository },
    {
      provide: LEGAL_REPRESENTATIVE_REPOSITORY,
      useClass: TypeOrmLegalRepresentativeRepository,
    },
    {
      provide: SHAREHOLDER_REPOSITORY,
      useClass: TypeOrmShareholderRepository,
    },
    {
      provide: GUARANTOR_REPOSITORY,
      useClass: TypeOrmGuarantorRepository,
    },
    {
      provide: SALES_REPRESENTATIVE_REPOSITORY,
      useClass: TypeOrmSalesRepresentativeRepository,
    },
    {
      provide: CONTRACT_SIGNER_REPOSITORY,
      useClass: TypeOrmContractSignerRepository,
    },
    GetPersonsUseCase,
    GetPersonByExternalIdUseCase,
    CreatePersonUseCase,
    CreateLegalRepresentativeUseCase,
    CreateShareholderUseCase,
    CreateGuarantorUseCase,
    CreateSalesRepresentativeUseCase,
    CreateContractSignerUseCase,
  ],
  exports: [
    PERSONS_REPOSITORY,
    LEGAL_REPRESENTATIVE_REPOSITORY,
    SHAREHOLDER_REPOSITORY,
    GUARANTOR_REPOSITORY,
    SALES_REPRESENTATIVE_REPOSITORY,
    CONTRACT_SIGNER_REPOSITORY,
    GetPersonsUseCase,
    GetPersonByExternalIdUseCase,
    CreatePersonUseCase,
    CreateLegalRepresentativeUseCase,
    CreateShareholderUseCase,
    CreateGuarantorUseCase,
    CreateSalesRepresentativeUseCase,
    CreateContractSignerUseCase,
  ],
})
export class PersonsModule {}
