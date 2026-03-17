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
const credit_application_entity_1 = require("../../infrastructure/database/entities/credit-application.entity");
const typeorm_credit_application_repository_1 = require("../../infrastructure/database/repositories/typeorm-credit-application.repository");
const credit_application_repository_port_1 = require("./domain/ports/credit-application.repository.port");
const credit_applications_controller_1 = require("./presentation/credit-applications.controller");
const create_credit_application_use_case_1 = require("./application/use-cases/create-credit-application.use-case");
const get_all_credit_applications_use_case_1 = require("./application/use-cases/get-all-credit-applications.use-case");
const get_credit_application_by_external_id_use_case_1 = require("./application/use-cases/get-credit-application-by-external-id.use-case");
const update_credit_application_use_case_1 = require("./application/use-cases/update-credit-application.use-case");
const delete_credit_application_use_case_1 = require("./application/use-cases/delete-credit-application.use-case");
let CreditApplicationsModule = class CreditApplicationsModule {
};
exports.CreditApplicationsModule = CreditApplicationsModule;
exports.CreditApplicationsModule = CreditApplicationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([credit_application_entity_1.CreditApplicationEntity])],
        controllers: [credit_applications_controller_1.CreditApplicationsController],
        providers: [
            {
                provide: credit_application_repository_port_1.CREDIT_APPLICATION_REPOSITORY,
                useClass: typeorm_credit_application_repository_1.TypeOrmCreditApplicationRepository,
            },
            create_credit_application_use_case_1.CreateCreditApplicationUseCase,
            get_all_credit_applications_use_case_1.GetAllCreditApplicationsUseCase,
            get_credit_application_by_external_id_use_case_1.GetCreditApplicationByExternalIdUseCase,
            update_credit_application_use_case_1.UpdateCreditApplicationUseCase,
            delete_credit_application_use_case_1.DeleteCreditApplicationUseCase,
        ],
        exports: [credit_application_repository_port_1.CREDIT_APPLICATION_REPOSITORY],
    })
], CreditApplicationsModule);
//# sourceMappingURL=credit-applications.module.js.map