import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from '@infrastructure/database/entities/person.entity';
import { TypeOrmPersonRepository } from '@infrastructure/database/repositories/typeorm-person.repository';
import { PERSONS_REPOSITORY } from './domain/ports/person.repository.port';
import { PersonsController } from './presentation/persons.controller';
import { GetPersonsUseCase } from './application/use-cases/get-persons.use-case';
import { GetPersonByExternalIdUseCase } from './application/use-cases/get-person-by-external-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity])],
  controllers: [PersonsController],
  providers: [
    {
      provide: PERSONS_REPOSITORY,
      useClass: TypeOrmPersonRepository,
    },
    GetPersonsUseCase,
    GetPersonByExternalIdUseCase,
  ],
  exports: [
    PERSONS_REPOSITORY,
    GetPersonsUseCase,
    GetPersonByExternalIdUseCase,
  ],
})
export class PersonsModule {}
