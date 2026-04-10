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
exports.DeleteBusinessByExternalIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const businesses_tokens_1 = require("../../../businesses.tokens");
let DeleteBusinessByExternalIdUseCase = class DeleteBusinessByExternalIdUseCase {
    business_repository;
    constructor(business_repository) {
        this.business_repository = business_repository;
    }
    async execute(req) {
        const ok = await this.business_repository.delete_by_external_id(req.external_id);
        if (!ok) {
            throw new common_1.NotFoundException('business not found');
        }
    }
};
exports.DeleteBusinessByExternalIdUseCase = DeleteBusinessByExternalIdUseCase;
exports.DeleteBusinessByExternalIdUseCase = DeleteBusinessByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(businesses_tokens_1.BUSINESS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeleteBusinessByExternalIdUseCase);
//# sourceMappingURL=delete-business-by-external-id.use-case.js.map