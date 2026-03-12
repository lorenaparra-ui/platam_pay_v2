import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessEntity } from '@infrastructure/database/entities/business.entity';
import { TypeOrmBusinessRepository } from '@infrastructure/database/repositories/typeorm-business.repository';
import { BUSINESS_REPOSITORY } from './domain/ports/business.repository.port';
import { BusinessController } from './presentation/business.controller';
import { CreateBusinessUseCase } from './application/use-cases/create-business.use-case';
import { GetBusinessByExternalIdUseCase } from './application/use-cases/get-business-by-external-id.use-case';
import { ListBusinessesUseCase } from './application/use-cases/list-businesses.use-case';
import { UpdateBusinessUseCase } from './application/use-cases/update-business.use-case';
import { DeleteBusinessUseCase } from './application/use-cases/delete-business.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessEntity])],
  controllers: [BusinessController],
  providers: [
    {
      provide: BUSINESS_REPOSITORY,
      useClass: TypeOrmBusinessRepository,
    },
    CreateBusinessUseCase,
    GetBusinessByExternalIdUseCase,
    ListBusinessesUseCase,
    UpdateBusinessUseCase,
    DeleteBusinessUseCase,
  ],
  exports: [
    BUSINESS_REPOSITORY,
    CreateBusinessUseCase,
    GetBusinessByExternalIdUseCase,
    ListBusinessesUseCase,
    UpdateBusinessUseCase,
    DeleteBusinessUseCase,
  ],
})
export class BusinessesModule {}
