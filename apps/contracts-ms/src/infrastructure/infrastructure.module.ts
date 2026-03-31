import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ContractEntity } from '@app/products-data';
import { PostgresTypeOrmConfigService } from './database/services/postgres-type-orm-config.service';
import { TypeormContractRepository } from './database/repositories/typeorm-contract.repository';
import { TypeormContractReferenceLookupAdapter } from './database/adapters/typeorm-contract-reference-lookup.adapter';
import { CONTRACT_REPOSITORY } from '@modules/contracts/contracts.tokens';
import { CONTRACT_REFERENCE_LOOKUP } from '@common/ports/contract-reference-lookup.port';
import { SqsModule } from './messaging/sqs/sqs.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: PostgresTypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([ContractEntity]),
    SqsModule,
  ],
  providers: [
    TypeormContractReferenceLookupAdapter,
    {
      provide: CONTRACT_REFERENCE_LOOKUP,
      useExisting: TypeormContractReferenceLookupAdapter,
    },
    {
      provide: CONTRACT_REPOSITORY,
      useClass: TypeormContractRepository,
    },
  ],
  exports: [CONTRACT_REPOSITORY, CONTRACT_REFERENCE_LOOKUP, SqsModule, TypeOrmModule],
})
export class InfrastructureModule {}
