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
exports.TypeOrmCreditApplicationBnplRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const credit_application_bnpl_entity_1 = require("../entities/credit-application-bnpl.entity");
const credit_application_bnpl_mapper_1 = require("../mappers/credit-application-bnpl.mapper");
let TypeOrmCreditApplicationBnplRepository = class TypeOrmCreditApplicationBnplRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async findAll() {
        const entities = await this.repository.find({ order: { id: "DESC" } });
        return entities.map(credit_application_bnpl_mapper_1.CreditApplicationBnplMapper.toDomain);
    }
    async findById(id) {
        const entity = await this.repository.findOne({ where: { id } });
        return entity ? credit_application_bnpl_mapper_1.CreditApplicationBnplMapper.toDomain(entity) : null;
    }
    async findByExternalId(externalId) {
        const entity = await this.repository.findOne({ where: { externalId } });
        return entity ? credit_application_bnpl_mapper_1.CreditApplicationBnplMapper.toDomain(entity) : null;
    }
    async create(payload) {
        const entity = credit_application_bnpl_mapper_1.CreditApplicationBnplMapper.toCreateEntity(payload);
        const saved = await this.repository.save(entity);
        const full = await this.repository.findOne({ where: { id: saved.id } });
        if (!full)
            throw new Error("Unexpected: credit application not found after create");
        return credit_application_bnpl_mapper_1.CreditApplicationBnplMapper.toDomain(full);
    }
    async updateByExternalId(externalId, payload) {
        const existing = await this.repository.findOne({ where: { externalId } });
        if (!existing)
            return null;
        const updated = credit_application_bnpl_mapper_1.CreditApplicationBnplMapper.applyUpdate(existing, payload);
        const saved = await this.repository.save(updated);
        return credit_application_bnpl_mapper_1.CreditApplicationBnplMapper.toDomain(saved);
    }
    async deleteByExternalId(externalId) {
        const result = await this.repository.delete({ externalId });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeOrmCreditApplicationBnplRepository = TypeOrmCreditApplicationBnplRepository;
exports.TypeOrmCreditApplicationBnplRepository = TypeOrmCreditApplicationBnplRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(credit_application_bnpl_entity_1.CreditApplicationBnplEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeOrmCreditApplicationBnplRepository);
//# sourceMappingURL=typeorm-credit-application-bnpl.repository.js.map