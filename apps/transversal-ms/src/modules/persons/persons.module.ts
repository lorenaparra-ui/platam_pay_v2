import { Module } from '@nestjs/common';
import { CreatePersonUseCase } from './application/use-cases/create-person/create-person.use-case';
import { GetPersonByExternalIdUseCase } from './application/use-cases/get-person-by-external-id/get-person-by-external-id.use-case';
import { ListPersonsUseCase } from './application/use-cases/list-persons/list-persons.use-case';
import { UpdatePersonByExternalIdUseCase } from './application/use-cases/update-person-by-external-id/update-person-by-external-id.use-case';
import { DeletePersonByExternalIdUseCase } from './application/use-cases/delete-person-by-external-id/delete-person-by-external-id.use-case';


@Module({
  providers: [
    CreatePersonUseCase,
    GetPersonByExternalIdUseCase,
    ListPersonsUseCase,
    UpdatePersonByExternalIdUseCase,
    DeletePersonByExternalIdUseCase,
  ],
  exports: [
    CreatePersonUseCase,
    GetPersonByExternalIdUseCase,
    ListPersonsUseCase,
    UpdatePersonByExternalIdUseCase,
    DeletePersonByExternalIdUseCase,
  ],
})
export class PersonsModule {}
