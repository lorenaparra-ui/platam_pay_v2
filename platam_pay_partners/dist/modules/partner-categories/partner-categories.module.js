"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const partner_categories_entity_1 = require("../../infrastructure/database/entities/partner-categories.entity");
const partners_entity_1 = require("../../infrastructure/database/entities/partners.entity");
const typeorm_partner_categories_repository_1 = require("../../infrastructure/database/repositories/typeorm-partner-categories.repository");
const create_partner_category_use_case_1 = require("./application/use-cases/create-partner-category.use-case");
const delete_partner_category_by_external_id_use_case_1 = require("./application/use-cases/delete-partner-category-by-external-id.use-case");
const find_all_partner_categories_use_case_1 = require("./application/use-cases/find-all-partner-categories.use-case");
const find_categories_by_partner_use_case_1 = require("./application/use-cases/find-categories-by-partner.use-case");
const find_partner_category_by_external_id_use_case_1 = require("./application/use-cases/find-partner-category-by-external-id.use-case");
const update_partner_category_by_external_id_use_case_1 = require("./application/use-cases/update-partner-category-by-external-id.use-case");
const partner_category_repository_port_1 = require("./domain/ports/partner-category.repository.port");
const partner_categories_controller_1 = require("./presentation/partner-categories.controller");
let PartnerCategoriesModule = class PartnerCategoriesModule {
};
exports.PartnerCategoriesModule = PartnerCategoriesModule;
exports.PartnerCategoriesModule = PartnerCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([partner_categories_entity_1.PartnerCategoriesEntity, partners_entity_1.PartnersEntity]),
        ],
        controllers: [partner_categories_controller_1.PartnerCategoriesController],
        providers: [
            {
                provide: partner_category_repository_port_1.PARTNER_CATEGORIES_REPOSITORY,
                useClass: typeorm_partner_categories_repository_1.TypeOrmPartnerCategoriesRepository,
            },
            create_partner_category_use_case_1.CreatePartnerCategoryUseCase,
            find_all_partner_categories_use_case_1.FindAllPartnerCategoriesUseCase,
            find_partner_category_by_external_id_use_case_1.FindPartnerCategoryByExternalIdUseCase,
            update_partner_category_by_external_id_use_case_1.UpdatePartnerCategoryByExternalIdUseCase,
            delete_partner_category_by_external_id_use_case_1.DeletePartnerCategoryByExternalIdUseCase,
            find_categories_by_partner_use_case_1.FindCategoriesByPartnerUseCase,
        ],
        exports: [partner_category_repository_port_1.PARTNER_CATEGORIES_REPOSITORY],
    })
], PartnerCategoriesModule);
//# sourceMappingURL=partner-categories.module.js.map