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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCreditFacilityWithCategoriesUseCase = void 0;
const common_1 = require("@nestjs/common");
const credit_facility_repository_port_1 = require("../../domain/ports/credit-facility.repository.port");
let CreateCreditFacilityWithCategoriesUseCase = class CreateCreditFacilityWithCategoriesUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async run(input) {
        if (!input.categories?.length) {
            throw new common_1.BadRequestException("Se requiere al menos una categoría por línea de crédito.");
        }
        return this.repository.create_with_categories(input);
    }
};
exports.CreateCreditFacilityWithCategoriesUseCase = CreateCreditFacilityWithCategoriesUseCase;
exports.CreateCreditFacilityWithCategoriesUseCase = CreateCreditFacilityWithCategoriesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_facility_repository_port_1.CREDIT_FACILITY_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateCreditFacilityWithCategoriesUseCase);
//# sourceMappingURL=create-credit-facility-with-categories.use-case.js.map