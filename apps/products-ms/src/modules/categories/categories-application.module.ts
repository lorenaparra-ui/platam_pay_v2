import { Module } from '@nestjs/common';
import { CreateCategoryUseCase } from '@modules/categories/application/use-cases/create-category/create-category.use-case';
import { GetCategoryByExternalIdUseCase } from '@modules/categories/application/use-cases/get-category-by-external-id/get-category-by-external-id.use-case';
import { ListCategoriesUseCase } from '@modules/categories/application/use-cases/list-categories/list-categories.use-case';
import { UpdateCategoryByExternalIdUseCase } from '@modules/categories/application/use-cases/update-category-by-external-id/update-category-by-external-id.use-case';
import { DeleteCategoryByExternalIdUseCase } from '@modules/categories/application/use-cases/delete-category-by-external-id/delete-category-by-external-id.use-case';
import { ListCategoriesByPartnerUseCase } from '@modules/categories/application/use-cases/list-categories-by-partner/list-categories-by-partner.use-case';

@Module({
  providers: [
    CreateCategoryUseCase,
    GetCategoryByExternalIdUseCase,
    ListCategoriesUseCase,
    UpdateCategoryByExternalIdUseCase,
    DeleteCategoryByExternalIdUseCase,
    ListCategoriesByPartnerUseCase,
  ],
  exports: [
    CreateCategoryUseCase,
    GetCategoryByExternalIdUseCase,
    ListCategoriesUseCase,
    UpdateCategoryByExternalIdUseCase,
    DeleteCategoryByExternalIdUseCase,
    ListCategoriesByPartnerUseCase,
  ],
})
export class CategoriesApplicationModule {}
