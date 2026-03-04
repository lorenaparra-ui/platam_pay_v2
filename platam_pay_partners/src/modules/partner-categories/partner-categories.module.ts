import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartnerCategoriesEntity } from "@infrastructure/database/entities/partner-categories.entity";
import { PartnersEntity } from "@infrastructure/database/entities/partners.entity";
import { TypeOrmPartnerCategoriesRepository } from "@infrastructure/database/repositories/typeorm-partner-categories.repository";
import { CreatePartnerCategoryUseCase } from "./application/use-cases/create-partner-category.use-case";
import { DeletePartnerCategoryByExternalIdUseCase } from "./application/use-cases/delete-partner-category-by-external-id.use-case";
import { FindAllPartnerCategoriesUseCase } from "./application/use-cases/find-all-partner-categories.use-case";
import { FindCategoriesByPartnerUseCase } from "./application/use-cases/find-categories-by-partner.use-case";
import { FindPartnerCategoryByExternalIdUseCase } from "./application/use-cases/find-partner-category-by-external-id.use-case";
import { UpdatePartnerCategoryByExternalIdUseCase } from "./application/use-cases/update-partner-category-by-external-id.use-case";
import { PARTNER_CATEGORIES_REPOSITORY } from "./domain/ports/partner-category.repository.port";
import { PartnerCategoriesController } from "./presentation/partner-categories.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([PartnerCategoriesEntity, PartnersEntity]),
  ],
  controllers: [PartnerCategoriesController],
  providers: [
    {
      provide: PARTNER_CATEGORIES_REPOSITORY,
      useClass: TypeOrmPartnerCategoriesRepository,
    },
    CreatePartnerCategoryUseCase,
    FindAllPartnerCategoriesUseCase,
    FindPartnerCategoryByExternalIdUseCase,
    UpdatePartnerCategoryByExternalIdUseCase,
    DeletePartnerCategoryByExternalIdUseCase,
    FindCategoriesByPartnerUseCase,
  ],
  exports: [PARTNER_CATEGORIES_REPOSITORY],
})
export class PartnerCategoriesModule {}
