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
exports.CreateSalesRepresentativeUseCase = void 0;
const common_1 = require("@nestjs/common");
const sales_representative_repository_port_1 = require("../../domain/ports/sales-representative.repository.port");
let CreateSalesRepresentativeUseCase = class CreateSalesRepresentativeUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(dto) {
        if (dto.userId != null) {
            const existing = await this.repository.findByUserId(dto.userId);
            if (existing) {
                throw new common_1.ConflictException('El usuario ya está asociado a otro representante de ventas');
            }
        }
        const payload = {
            partnerId: dto.partnerId,
            userId: dto.userId ?? null,
            name: dto.name,
            role: dto.role,
            statusId: dto.statusId,
        };
        return this.repository.create(payload);
    }
};
exports.CreateSalesRepresentativeUseCase = CreateSalesRepresentativeUseCase;
exports.CreateSalesRepresentativeUseCase = CreateSalesRepresentativeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sales_representative_repository_port_1.SALES_REPRESENTATIVE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateSalesRepresentativeUseCase);
//# sourceMappingURL=create-sales-representative.use-case.js.map