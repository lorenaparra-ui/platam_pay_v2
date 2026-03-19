"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditFacilitiesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("@libs/database");
const categories_module_1 = require("../categories/categories.module");
const typeorm_credit_facility_repository_1 = require("../../infrastructure/database/repositories/typeorm-credit-facility.repository");
const credit_facility_repository_port_1 = require("./domain/ports/credit-facility.repository.port");
const create_credit_facility_use_case_1 = require("./application/use-cases/create-credit-facility.use-case");
const create_credit_facility_with_categories_use_case_1 = require("./application/use-cases/create-credit-facility-with-categories.use-case");
let CreditFacilitiesModule = class CreditFacilitiesModule {
};
exports.CreditFacilitiesModule = CreditFacilitiesModule;
exports.CreditFacilitiesModule = CreditFacilitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([database_1.CreditFacilityEntity]),
            categories_module_1.CategoriesModule,
        ],
        controllers: [],
        providers: [
            {
                provide: credit_facility_repository_port_1.CREDIT_FACILITY_REPOSITORY,
                useClass: typeorm_credit_facility_repository_1.TypeOrmCreditFacilityRepository,
            },
            create_credit_facility_use_case_1.CreateCreditFacilityUseCase,
            create_credit_facility_with_categories_use_case_1.CreateCreditFacilityWithCategoriesUseCase,
        ],
        exports: [
            credit_facility_repository_port_1.CREDIT_FACILITY_REPOSITORY,
            create_credit_facility_use_case_1.CreateCreditFacilityUseCase,
            create_credit_facility_with_categories_use_case_1.CreateCreditFacilityWithCategoriesUseCase,
        ],
    })
], CreditFacilitiesModule);
//# sourceMappingURL=credit-facilities.module.js.map