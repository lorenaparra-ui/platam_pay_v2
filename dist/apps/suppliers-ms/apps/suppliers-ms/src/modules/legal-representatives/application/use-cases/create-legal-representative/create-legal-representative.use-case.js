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
exports.CreateLegalRepresentativeUseCase = void 0;
const common_1 = require("@nestjs/common");
const legal_representatives_tokens_1 = require("../../../legal-representatives.tokens");
const create_legal_representative_response_1 = require("./create-legal-representative.response");
let CreateLegalRepresentativeUseCase = class CreateLegalRepresentativeUseCase {
    legal_representatives;
    constructor(legal_representatives) {
        this.legal_representatives = legal_representatives;
    }
    async execute(req) {
        const created = await this.legal_representatives.create({
            business_id: req.business_internal_id,
            person_id: req.person_internal_id,
            is_primary: req.is_primary,
        });
        return new create_legal_representative_response_1.CreateLegalRepresentativeResponse(created.external_id);
    }
};
exports.CreateLegalRepresentativeUseCase = CreateLegalRepresentativeUseCase;
exports.CreateLegalRepresentativeUseCase = CreateLegalRepresentativeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(legal_representatives_tokens_1.LEGAL_REPRESENTATIVE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateLegalRepresentativeUseCase);
//# sourceMappingURL=create-legal-representative.use-case.js.map