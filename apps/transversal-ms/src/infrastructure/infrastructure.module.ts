import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TransversalDataModule } from '@app/transversal-data';
import { PostgresTypeOrmConfigService } from './database/services/postgres-type-orm-config.service';
import { StorageModule } from '@infrastructure/storage/storage.module';
import { SqsModule } from './messaging/sqs/sqs.module';
import { TypeormUploadFilesIdempotencyAdapter } from '@infrastructure/database/adapters/typeorm-upload-files-idempotency.adapter';
import { UPLOAD_FILES_IDEMPOTENCY_PORT } from '@modules/transversal/transversal.tokens';
import { TypeormPersonRepository } from '@infrastructure/database/repositories/typeorm-person.repository';
import { TypeormUserRepository } from '@infrastructure/database/repositories/typeorm-user.repository';
import { TypeormRoleRepository } from '@infrastructure/database/repositories/typeorm-role.repository';
import { TypeormCityRepository } from '@infrastructure/database/repositories/typeorm-city.repository';
import { TypeormStatusRepository } from '@infrastructure/database/repositories/typeorm-status.repository';
import { TypeormCurrencyReadRepository } from '@infrastructure/database/repositories/typeorm-currency-read.repository';
import { PERSON_REPOSITORY } from '@modules/persons/persons.tokens';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import {
  ROLE_REPOSITORY,
  CITY_REPOSITORY,
  STATUS_REPOSITORY,
  CURRENCY_READ_PORT,
} from '@modules/transversal/catalog.tokens';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: PostgresTypeOrmConfigService,
    }),
    TransversalDataModule,
    StorageModule,
    SqsModule,
  ],
  providers: [
    TypeormUploadFilesIdempotencyAdapter,
    {
      provide: UPLOAD_FILES_IDEMPOTENCY_PORT,
      useExisting: TypeormUploadFilesIdempotencyAdapter,
    },
    {
      provide: PERSON_REPOSITORY,
      useClass: TypeormPersonRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: TypeormUserRepository,
    },
    {
      provide: ROLE_REPOSITORY,
      useClass: TypeormRoleRepository,
    },
    {
      provide: CITY_REPOSITORY,
      useClass: TypeormCityRepository,
    },
    {
      provide: STATUS_REPOSITORY,
      useClass: TypeormStatusRepository,
    },
    {
      provide: CURRENCY_READ_PORT,
      useClass: TypeormCurrencyReadRepository,
    },
  ],
  exports: [
    TransversalDataModule,
    UPLOAD_FILES_IDEMPOTENCY_PORT,
    PERSON_REPOSITORY,
    USER_REPOSITORY,
    ROLE_REPOSITORY,
    CITY_REPOSITORY,
    STATUS_REPOSITORY,
    CURRENCY_READ_PORT,
  ],
})
export class InfrastructureModule {}
