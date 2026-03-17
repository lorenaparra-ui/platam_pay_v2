"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditApplicationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const credit_application_bnpl_entity_1 = require("../../infrastructure/database/entities/credit-application-bnpl.entity");
const typeorm_credit_application_bnpl_repository_1 = require("../../infrastructure/database/repositories/typeorm-credit-application-bnpl.repository");
const credit_application_bnpl_repository_port_1 = require("./domain/ports/credit-application-bnpl.repository.port");
const credit_applications_bnpl_controller_1 = require("./presentation/credit-applications-bnpl.controller");
const create_credit_application_bnpl_use_case_1 = require("./application/use-cases/create-credit-application-bnpl.use-case");
const get_all_credit_applications_bnpl_use_case_1 = require("./application/use-cases/get-all-credit-applications-bnpl.use-case");
const get_credit_application_bnpl_by_external_id_use_case_1 = require("./application/use-cases/get-credit-application-bnpl-by-external-id.use-case");
const update_credit_application_bnpl_use_case_1 = require("./application/use-cases/update-credit-application-bnpl.use-case");
const delete_credit_application_bnpl_use_case_1 = require("./application/use-cases/delete-credit-application-bnpl.use-case");
let CreditApplicationsModule = class CreditApplicationsModule {
};
exports.CreditApplicationsModule = CreditApplicationsModule;
exports.CreditApplicationsModule = CreditApplicationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([credit_application_bnpl_entity_1.CreditApplicationBnplEntity])],
        controllers: [credit_applications_bnpl_controller_1.CreditApplicationsBnplController],
        providers: [
            {
                provide: credit_application_bnpl_repository_port_1.CREDIT_APPLICATION_BNPL_REPOSITORY,
                useClass: typeorm_credit_application_bnpl_repository_1.TypeOrmCreditApplicationBnplRepository,
            },
            create_credit_application_bnpl_use_case_1.CreateCreditApplicationBnplUseCase,
            get_all_credit_applications_bnpl_use_case_1.GetAllCreditApplicationsBnplUseCase,
            get_credit_application_bnpl_by_external_id_use_case_1.GetCreditApplicationBnplByExternalIdUseCase,
            update_credit_application_bnpl_use_case_1.UpdateCreditApplicationBnplUseCase,
            delete_credit_application_bnpl_use_case_1.DeleteCreditApplicationBnplUseCase,
        ],
        exports: [credit_application_bnpl_repository_port_1.CREDIT_APPLICATION_BNPL_REPOSITORY],
    })
], CreditApplicationsModule);
//# sourceMappingURL=credit-applications.module.js.map