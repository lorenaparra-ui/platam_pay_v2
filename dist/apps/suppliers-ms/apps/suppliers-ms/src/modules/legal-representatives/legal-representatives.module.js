"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalRepresentativesModule = void 0;
const common_1 = require("@nestjs/common");
const infrastructure_module_1 = require("../../infrastructure/infrastructure.module");
const typeorm_legal_representative_repository_1 = require("../../infrastructure/database/repositories/typeorm-legal-representative.repository");
const legal_representatives_tokens_1 = require("./legal-representatives.tokens");
const create_legal_representative_use_case_1 = require("./application/use-cases/create-legal-representative/create-legal-representative.use-case");
let LegalRepresentativesModule = class LegalRepresentativesModule {
};
exports.LegalRepresentativesModule = LegalRepresentativesModule;
exports.LegalRepresentativesModule = LegalRepresentativesModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule],
        providers: [
            {
                provide: legal_representatives_tokens_1.LEGAL_REPRESENTATIVE_REPOSITORY,
                useExisting: typeorm_legal_representative_repository_1.TypeormLegalRepresentativeRepository,
            },
            create_legal_representative_use_case_1.CreateLegalRepresentativeUseCase,
        ],
        exports: [legal_representatives_tokens_1.LEGAL_REPRESENTATIVE_REPOSITORY, create_legal_representative_use_case_1.CreateLegalRepresentativeUseCase],
    })
], LegalRepresentativesModule);
//# sourceMappingURL=legal-representatives.module.js.map