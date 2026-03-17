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
exports.UpdateBusinessUseCase = void 0;
const common_1 = require("@nestjs/common");
const business_repository_port_1 = require("../../domain/ports/business.repository.port");
const business_response_dto_1 = require("../dto/business-response.dto");
let UpdateBusinessUseCase = class UpdateBusinessUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(externalId, dto) {
        const payload = {};
        if (dto.userId !== undefined)
            payload.userId = dto.userId;
        if (dto.cityId !== undefined)
            payload.cityId = dto.cityId;
        if (dto.entityType !== undefined)
            payload.entityType = dto.entityType;
        if (dto.businessName !== undefined)
            payload.businessName = dto.businessName;
        if (dto.businessAddress !== undefined)
            payload.businessAddress = dto.businessAddress;
        if (dto.businessType !== undefined)
            payload.businessType = dto.businessType;
        if (dto.relationshipToBusiness !== undefined)
            payload.relationshipToBusiness = dto.relationshipToBusiness;
        if (dto.legalName !== undefined)
            payload.legalName = dto.legalName;
        if (dto.tradeName !== undefined)
            payload.tradeName = dto.tradeName;
        if (dto.taxId !== undefined)
            payload.taxId = dto.taxId;
        if (dto.yearOfEstablishment !== undefined)
            payload.yearOfEstablishment = dto.yearOfEstablishment;
        const business = await this.repository.updateByExternalId(externalId, payload);
        return business ? business_response_dto_1.BusinessResponseDto.fromDomain(business) : null;
    }
};
exports.UpdateBusinessUseCase = UpdateBusinessUseCase;
exports.UpdateBusinessUseCase = UpdateBusinessUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(business_repository_port_1.BUSINESS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateBusinessUseCase);
//# sourceMappingURL=update-business.use-case.js.map