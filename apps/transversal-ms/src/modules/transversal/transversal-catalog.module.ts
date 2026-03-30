import { Module } from '@nestjs/common';
import { RolesController } from '@modules/transversal/catalog/presentation/roles.controller';
import { CitiesController } from '@modules/transversal/catalog/presentation/cities.controller';
import { StatesController } from '@modules/transversal/catalog/presentation/states.controller';
import { CreateRoleUseCase } from '@modules/transversal/catalog/application/use-cases/roles/create-role.use-case';
import { GetRoleByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/roles/get-role-by-external-id.use-case';
import { ListRolesUseCase } from '@modules/transversal/catalog/application/use-cases/roles/list-roles.use-case';
import { UpdateRoleByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/roles/update-role-by-external-id.use-case';
import { DeleteRoleByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/roles/delete-role-by-external-id.use-case';
import { CreateCityUseCase } from '@modules/transversal/catalog/application/use-cases/cities/create-city.use-case';
import { GetCityByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/cities/get-city-by-external-id.use-case';
import { ListCitiesUseCase } from '@modules/transversal/catalog/application/use-cases/cities/list-cities.use-case';
import { UpdateCityByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/cities/update-city-by-external-id.use-case';
import { DeleteCityByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/cities/delete-city-by-external-id.use-case';
import { CreateStateUseCase } from '@modules/transversal/catalog/application/use-cases/states/create-state.use-case';
import { GetStateByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/states/get-state-by-external-id.use-case';
import { ListStatesUseCase } from '@modules/transversal/catalog/application/use-cases/states/list-states.use-case';
import { UpdateStateByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/states/update-state-by-external-id.use-case';
import { DeleteStateByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/states/delete-state-by-external-id.use-case';

@Module({
  controllers: [RolesController, CitiesController, StatesController],
  providers: [
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
    CreateStateUseCase,
    GetStateByExternalIdUseCase,
    ListStatesUseCase,
    UpdateStateByExternalIdUseCase,
    DeleteStateByExternalIdUseCase,
  ],
})
export class TransversalCatalogModule {}
