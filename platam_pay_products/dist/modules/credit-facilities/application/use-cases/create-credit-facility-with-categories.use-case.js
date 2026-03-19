"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCreditFacilityWithCategoriesUseCase = void 0;
const common_1 = require("@nestjs/common");
const create_credit_facility_use_case_1 = require("./create-credit-facility.use-case");
const create_categories_bulk_use_case_1 = require("../../../categories/application/use-cases/create-categories-bulk.use-case");
let CreateCreditFacilityWithCategoriesUseCase = class CreateCreditFacilityWithCategoriesUseCase {
    create_facility;
    create_categories_bulk;
    constructor(create_facility, create_categories_bulk) {
        this.create_facility = create_facility;
        this.create_categories_bulk = create_categories_bulk;
    }
    async run(input) {
        if (!input.categories?.length) {
            throw new common_1.BadRequestException("Se requiere al menos una categoría por línea de crédito.");
        }
        const facility = await this.create_facility.run({
            contract_id: input.contract_id,
            status_id: input.status_id,
            total_limit: input.total_limit,
        });
        const categories = await this.create_categories_bulk.run({
            credit_facility_id: facility.id,
            categories: input.categories,
        });
        return { facility, categories };
    }
};
exports.CreateCreditFacilityWithCategoriesUseCase = CreateCreditFacilityWithCategoriesUseCase;
exports.CreateCreditFacilityWithCategoriesUseCase = CreateCreditFacilityWithCategoriesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [create_credit_facility_use_case_1.CreateCreditFacilityUseCase,
        create_categories_bulk_use_case_1.CreateCategoriesBulkUseCase])
], CreateCreditFacilityWithCategoriesUseCase);
//# sourceMappingURL=create-credit-facility-with-categories.use-case.js.map