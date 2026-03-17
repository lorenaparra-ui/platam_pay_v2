"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackofficeCreditApplicationsModule = void 0;
const common_1 = require("@nestjs/common");
const backoffice_credit_applications_read_repository_port_1 = require("./domain/ports/backoffice-credit-applications-read.repository.port");
const typeorm_backoffice_credit_applications_read_repository_1 = require("../../infrastructure/database/repositories/typeorm-backoffice-credit-applications-read.repository");
const list_credit_applications_use_case_1 = require("./application/use-cases/list-credit-applications.use-case");
const get_status_counts_use_case_1 = require("./application/use-cases/get-status-counts.use-case");
const list_active_partners_use_case_1 = require("./application/use-cases/list-active-partners.use-case");
const backoffice_credit_applications_controller_1 = require("./presentation/backoffice-credit-applications.controller");
const backoffice_auth_guard_1 = require("./presentation/guards/backoffice-auth.guard");
let BackofficeCreditApplicationsModule = class BackofficeCreditApplicationsModule {
};
exports.BackofficeCreditApplicationsModule = BackofficeCreditApplicationsModule;
exports.BackofficeCreditApplicationsModule = BackofficeCreditApplicationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [backoffice_credit_applications_controller_1.BackofficeCreditApplicationsController],
        providers: [
            {
                provide: backoffice_credit_applications_read_repository_port_1.BACKOFFICE_CREDIT_APPLICATIONS_READ_REPOSITORY,
                useClass: typeorm_backoffice_credit_applications_read_repository_1.TypeOrmBackofficeCreditApplicationsReadRepository,
            },
            list_credit_applications_use_case_1.ListCreditApplicationsUseCase,
            get_status_counts_use_case_1.GetStatusCountsUseCase,
            list_active_partners_use_case_1.ListActivePartnersUseCase,
            backoffice_auth_guard_1.BackofficeAuthGuard,
        ],
    })
], BackofficeCreditApplicationsModule);
//# sourceMappingURL=backoffice-credit-applications.module.js.map