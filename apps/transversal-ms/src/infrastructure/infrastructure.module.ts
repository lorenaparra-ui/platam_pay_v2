import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TransversalDataModule } from '@app/transversal-data';
import { PostgresTypeOrmConfigService } from './database/services/postgres-type-orm-config.service';
import { StorageModule } from '@infrastructure/storage/storage.module';
import { SqsModule } from './messaging/sqs/sqs.module';
import { UploadFilesIdempotencyEntity } from '@infrastructure/database/entities/upload-files-idempotency.entity';
import { TypeormUploadFilesIdempotencyAdapter } from '@infrastructure/database/adapters/typeorm-upload-files-idempotency.adapter';
import { UPLOAD_FILES_IDEMPOTENCY_PORT } from '@modules/transversal/transversal.tokens';
import { TypeormPersonRepository } from '@infrastructure/database/repositories/typeorm-person.repository';
import { TypeormUserRepository } from '@infrastructure/database/repositories/typeorm-user.repository';
import { PERSON_REPOSITORY } from '@modules/persons/persons.tokens';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import { PERSON_REFERENCE_LOOKUP } from '@modules/persons/domain/ports/person-reference-lookup.port';
import { USER_REFERENCE_LOOKUP } from '@modules/users/domain/ports/user-reference-lookup.port';
import { TypeormPersonReferenceLookupAdapter } from '@infrastructure/database/common/typeorm-person-reference-lookup.adapter';
import { TypeormUserReferenceLookupAdapter } from '@infrastructure/database/common/typeorm-user-reference-lookup.adapter';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: PostgresTypeOrmConfigService,
    }),
    TransversalDataModule,
    TypeOrmModule.forFeature([UploadFilesIdempotencyEntity]),
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
    TypeormPersonReferenceLookupAdapter,
    TypeormUserReferenceLookupAdapter,
    {
      provide: PERSON_REFERENCE_LOOKUP,
      useExisting: TypeormPersonReferenceLookupAdapter,
    },
    {
      provide: USER_REFERENCE_LOOKUP,
      useExisting: TypeormUserReferenceLookupAdapter,
    },
  ],
  exports: [
    TransversalDataModule,
    UPLOAD_FILES_IDEMPOTENCY_PORT,
    PERSON_REPOSITORY,
    USER_REPOSITORY,
    PERSON_REFERENCE_LOOKUP,
    USER_REFERENCE_LOOKUP,
  ],
})
export class InfrastructureModule {}
