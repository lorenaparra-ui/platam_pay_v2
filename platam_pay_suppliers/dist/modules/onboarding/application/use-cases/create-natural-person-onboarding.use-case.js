"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNaturalPersonOnboardingUseCase = void 0;
const common_1 = require("@nestjs/common");
let CreateNaturalPersonOnboardingUseCase = class CreateNaturalPersonOnboardingUseCase {
    async execute({ context, applicant, business, financial, isPartnerClient }) {
        return { acknowledged: true };
    }
};
exports.CreateNaturalPersonOnboardingUseCase = CreateNaturalPersonOnboardingUseCase;
exports.CreateNaturalPersonOnboardingUseCase = CreateNaturalPersonOnboardingUseCase = __decorate([
    (0, common_1.Injectable)()
], CreateNaturalPersonOnboardingUseCase);
//# sourceMappingURL=create-natural-person-onboarding.use-case.js.map