"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRepresentativesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("@libs/database");
const typeorm_sales_representative_repository_1 = require("../../infrastructure/database/repositories/typeorm-sales-representative.repository");
const sales_representative_repository_port_1 = require("./domain/ports/sales-representative.repository.port");
const create_sales_representative_use_case_1 = require("./application/use-cases/create-sales-representative.use-case");
const sales_representatives_controller_1 = require("./presentation/sales-representatives.controller");
let SalesRepresentativesModule = class SalesRepresentativesModule {
};
exports.SalesRepresentativesModule = SalesRepresentativesModule;
exports.SalesRepresentativesModule = SalesRepresentativesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([database_1.SalesRepresentativeEntity])],
        controllers: [sales_representatives_controller_1.SalesRepresentativesController],
        providers: [
            {
                provide: sales_representative_repository_port_1.SALES_REPRESENTATIVE_REPOSITORY,
                useClass: typeorm_sales_representative_repository_1.TypeOrmSalesRepresentativeRepository,
            },
            create_sales_representative_use_case_1.CreateSalesRepresentativeUseCase,
        ],
        exports: [sales_representative_repository_port_1.SALES_REPRESENTATIVE_REPOSITORY, create_sales_representative_use_case_1.CreateSalesRepresentativeUseCase],
    })
], SalesRepresentativesModule);
//# sourceMappingURL=sales-representatives.module.js.map