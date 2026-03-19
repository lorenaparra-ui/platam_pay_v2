"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("@libs/database");
const typeorm_category_repository_1 = require("../../infrastructure/database/repositories/typeorm-category.repository");
const category_repository_port_1 = require("./domain/ports/category.repository.port");
const categories_controller_1 = require("./presentation/categories.controller");
const create_category_use_case_1 = require("./application/use-cases/create-category.use-case");
const create_categories_bulk_use_case_1 = require("./application/use-cases/create-categories-bulk.use-case");
const get_category_by_external_id_use_case_1 = require("./application/use-cases/get-category-by-external-id.use-case");
const list_categories_by_credit_facility_id_use_case_1 = require("./application/use-cases/list-categories-by-credit-facility-id.use-case");
const update_category_use_case_1 = require("./application/use-cases/update-category.use-case");
const delete_category_use_case_1 = require("./application/use-cases/delete-category.use-case");
let CategoriesModule = class CategoriesModule {
};
exports.CategoriesModule = CategoriesModule;
exports.CategoriesModule = CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([database_1.CategoryEntity])],
        controllers: [categories_controller_1.CategoriesController],
        providers: [
            { provide: category_repository_port_1.CATEGORY_REPOSITORY, useClass: typeorm_category_repository_1.TypeOrmCategoryRepository },
            create_category_use_case_1.CreateCategoryUseCase,
            create_categories_bulk_use_case_1.CreateCategoriesBulkUseCase,
            get_category_by_external_id_use_case_1.GetCategoryByExternalIdUseCase,
            list_categories_by_credit_facility_id_use_case_1.ListCategoriesByCreditFacilityIdUseCase,
            update_category_use_case_1.UpdateCategoryUseCase,
            delete_category_use_case_1.DeleteCategoryUseCase,
        ],
        exports: [
            category_repository_port_1.CATEGORY_REPOSITORY,
            create_category_use_case_1.CreateCategoryUseCase,
            create_categories_bulk_use_case_1.CreateCategoriesBulkUseCase,
            get_category_by_external_id_use_case_1.GetCategoryByExternalIdUseCase,
            list_categories_by_credit_facility_id_use_case_1.ListCategoriesByCreditFacilityIdUseCase,
            update_category_use_case_1.UpdateCategoryUseCase,
            delete_category_use_case_1.DeleteCategoryUseCase,
        ],
    })
], CategoriesModule);
//# sourceMappingURL=categories.module.js.map