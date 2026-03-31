import { Module } from '@nestjs/common';
import { RolesController } from '@modules/transversal/catalog/presentation/roles.controller';
import { CitiesController } from '@modules/transversal/catalog/presentation/cities.controller';
import { StatusesController } from '@modules/transversal/catalog/presentation/statuses.controller';
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
import { CreateStatusUseCase } from '@modules/transversal/catalog/application/use-cases/statuses/create-status.use-case';
import { GetStatusByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/statuses/get-status-by-external-id.use-case';
import { ListStatusesUseCase } from '@modules/transversal/catalog/application/use-cases/statuses/list-statuses.use-case';
import { UpdateStatusByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/statuses/update-status-by-external-id.use-case';
import { DeleteStatusByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/statuses/delete-status-by-external-id.use-case';

@Module({
  controllers: [RolesController, CitiesController, StatusesController],
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
    CreateStatusUseCase,
    GetStatusByExternalIdUseCase,
    ListStatusesUseCase,
    UpdateStatusByExternalIdUseCase,
    DeleteStatusByExternalIdUseCase,
  ],
})
export class TransversalCatalogModule {}
