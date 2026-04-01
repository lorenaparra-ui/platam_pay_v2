import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessagingApplicationModule } from '@messaging/messaging-application.module';
import { UsersModule } from '@modules/users/users.module';
import { PersonsModule } from '@modules/persons/persons.module';
import { UploadFilesUseCase } from './application/use-cases/upload-files/upload-files.use-case';
import { IngestUploadFilesSqsMessageUseCase } from './application/use-cases/upload-files/ingest-upload-files-sqs-message.use-case';
import { IngestPartnerCreateUserSqsMessageUseCase } from '../users/application/use-cases/partner-create-user/ingest-partner-create-user-sqs-message.use-case';
import { RolesController } from './presentation/roles.controller';
import { CitiesController } from './presentation/cities.controller';
import { StatusesController } from './presentation/statuses.controller';
import { CreateRoleUseCase } from './application/use-cases/roles/create-role.use-case';
import { GetRoleByExternalIdUseCase } from './application/use-cases/roles/get-role-by-external-id.use-case';
import { ListRolesUseCase } from './application/use-cases/roles/list-roles.use-case';
import { UpdateRoleByExternalIdUseCase } from './application/use-cases/roles/update-role-by-external-id.use-case';
import { DeleteRoleByExternalIdUseCase } from './application/use-cases/roles/delete-role-by-external-id.use-case';
import { CreateCityUseCase } from './application/use-cases/cities/create-city.use-case';
import { GetCityByExternalIdUseCase } from './application/use-cases/cities/get-city-by-external-id.use-case';
import { ListCitiesUseCase } from './application/use-cases/cities/list-cities.use-case';
import { UpdateCityByExternalIdUseCase } from './application/use-cases/cities/update-city-by-external-id.use-case';
import { DeleteCityByExternalIdUseCase } from './application/use-cases/cities/delete-city-by-external-id.use-case';
import { CreateStatusUseCase } from './application/use-cases/statuses/create-status.use-case';
import { GetStatusByExternalIdUseCase } from './application/use-cases/statuses/get-status-by-external-id.use-case';
import { ListStatusesUseCase } from './application/use-cases/statuses/list-statuses.use-case';
import { UpdateStatusByExternalIdUseCase } from './application/use-cases/statuses/update-status-by-external-id.use-case';
import { DeleteStatusByExternalIdUseCase } from './application/use-cases/statuses/delete-status-by-external-id.use-case';

@Module({
  controllers: [RolesController, CitiesController, StatusesController],
  imports: [ConfigModule, MessagingApplicationModule, UsersModule, PersonsModule],
  providers: [
    UploadFilesUseCase,
    IngestUploadFilesSqsMessageUseCase,
    IngestPartnerCreateUserSqsMessageUseCase,
  
    CreateRoleUseCase,
    GetRoleByExternalIdUseCase,
    ListRolesUseCase,
    UpdateRoleByExternalIdUseCase,
    DeleteRoleByExternalIdUseCase,
    CreateCityUseCase,
    GetCityByExternalIdUseCase,
    ListCitiesUseCase,
    UpdateCityByExternalIdUseCase,
    DeleteCityByExternalIdUseCase,
    CreateStatusUseCase,
    GetStatusByExternalIdUseCase,
    ListStatusesUseCase,
    UpdateStatusByExternalIdUseCase,
    DeleteStatusByExternalIdUseCase,
  
  ],
  exports: [
    IngestUploadFilesSqsMessageUseCase,
    IngestPartnerCreateUserSqsMessageUseCase,
    PersonsModule,
    UploadFilesUseCase,
  ],
})
export class TransversalModule {}
