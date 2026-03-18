"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("@libs/database");
const onboarding_controller_1 = require("./presentation/controllers/onboarding.controller");
const create_natural_person_onboarding_use_case_1 = require("./application/use-cases/create-natural-person-onboarding.use-case");
const create_sales_rep_natural_opinion_use_case_1 = require("./application/use-cases/create-sales-rep-natural-opinion.use-case");
const typeorm_onboarding_repository_1 = require("../../infrastructure/database/repositories/typeorm-onboarding.repository");
const onboarding_repository_port_1 = require("./domain/ports/onboarding.repository.port");
let OnboardingModule = class OnboardingModule {
};
exports.OnboardingModule = OnboardingModule;
exports.OnboardingModule = OnboardingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([database_1.OnboardingEntity])],
        controllers: [onboarding_controller_1.OnboardingController],
        providers: [
            {
                provide: onboarding_repository_port_1.ONBOARDING_REPOSITORY,
                useClass: typeorm_onboarding_repository_1.TypeOrmOnboardingRepository,
            },
            create_natural_person_onboarding_use_case_1.CreateNaturalPersonOnboardingUseCase,
            create_sales_rep_natural_opinion_use_case_1.CreateSalesRepNaturalOpinionUseCase,
        ],
        exports: [
            onboarding_repository_port_1.ONBOARDING_REPOSITORY,
            create_natural_person_onboarding_use_case_1.CreateNaturalPersonOnboardingUseCase,
            create_sales_rep_natural_opinion_use_case_1.CreateSalesRepNaturalOpinionUseCase,
        ],
    })
], OnboardingModule);
//# sourceMappingURL=onboarding.module.js.map