import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "@libs/database";
import { TypeOrmCategoryRepository } from "@infrastructure/database/repositories/typeorm-category.repository";
import { CATEGORY_REPOSITORY } from "./domain/ports/category.repository.port";
import { CategoriesController } from "./presentation/categories.controller";
import { CreateCategoryUseCase } from "./application/use-cases/create-category.use-case";
import { CreateCategoriesBulkUseCase } from "./application/use-cases/create-categories-bulk.use-case";
import { GetCategoryByExternalIdUseCase } from "./application/use-cases/get-category-by-external-id.use-case";
import { ListCategoriesByCreditFacilityIdUseCase } from "./application/use-cases/list-categories-by-credit-facility-id.use-case";
import { UpdateCategoryUseCase } from "./application/use-cases/update-category.use-case";
import { DeleteCategoryUseCase } from "./application/use-cases/delete-category.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoriesController],
  providers: [
    { provide: CATEGORY_REPOSITORY, useClass: TypeOrmCategoryRepository },
    CreateCategoryUseCase,
    CreateCategoriesBulkUseCase,
    GetCategoryByExternalIdUseCase,
    ListCategoriesByCreditFacilityIdUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
  ],
  exports: [
    CATEGORY_REPOSITORY,
    CreateCategoryUseCase,
    CreateCategoriesBulkUseCase,
    GetCategoryByExternalIdUseCase,
    ListCategoriesByCreditFacilityIdUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
  ],
})
export class CategoriesModule {}
