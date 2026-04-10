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
exports.DeletePartnerByExternalIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const partners_tokens_1 = require("../../../partners.tokens");
let DeletePartnerByExternalIdUseCase = class DeletePartnerByExternalIdUseCase {
    partner_repository;
    constructor(partner_repository) {
        this.partner_repository = partner_repository;
    }
    async execute(req) {
        const ok = await this.partner_repository.delete_by_external_id(req.external_id);
        if (!ok) {
            throw new common_1.NotFoundException('partner not found');
        }
    }
};
exports.DeletePartnerByExternalIdUseCase = DeletePartnerByExternalIdUseCase;
exports.DeletePartnerByExternalIdUseCase = DeletePartnerByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(partners_tokens_1.PARTNER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeletePartnerByExternalIdUseCase);
//# sourceMappingURL=delete-partner-by-external-id.use-case.js.map