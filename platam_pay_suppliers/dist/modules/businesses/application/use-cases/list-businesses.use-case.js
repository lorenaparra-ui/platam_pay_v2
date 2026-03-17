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
exports.ListBusinessesUseCase = void 0;
const common_1 = require("@nestjs/common");
const business_repository_port_1 = require("../../domain/ports/business.repository.port");
const business_response_dto_1 = require("../dto/business-response.dto");
let ListBusinessesUseCase = class ListBusinessesUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        const list = await this.repository.findAll();
        return list.map(business_response_dto_1.BusinessResponseDto.fromDomain);
    }
};
exports.ListBusinessesUseCase = ListBusinessesUseCase;
exports.ListBusinessesUseCase = ListBusinessesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(business_repository_port_1.BUSINESS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListBusinessesUseCase);
//# sourceMappingURL=list-businesses.use-case.js.map