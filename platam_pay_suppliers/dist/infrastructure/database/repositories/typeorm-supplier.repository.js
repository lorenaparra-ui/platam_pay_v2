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
exports.TypeOrmSupplierRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const supplier_entity_1 = require("../entities/supplier.entity");
const supplier_mapper_1 = require("../mappers/supplier.mapper");
let TypeOrmSupplierRepository = class TypeOrmSupplierRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async findAll() {
        const entities = await this.repository.find({
            order: { createdAt: "DESC" },
        });
        return entities.map(supplier_mapper_1.SupplierMapper.toDomain);
    }
    async findById(id) {
        const entity = await this.repository.findOne({ where: { id } });
        return entity ? supplier_mapper_1.SupplierMapper.toDomain(entity) : null;
    }
    async findByExternalId(externalId) {
        const entity = await this.repository.findOne({ where: { externalId } });
        return entity ? supplier_mapper_1.SupplierMapper.toDomain(entity) : null;
    }
    async findByBusinessId(businessId) {
        const entity = await this.repository.findOne({ where: { businessId } });
        return entity ? supplier_mapper_1.SupplierMapper.toDomain(entity) : null;
    }
    async create(payload) {
        const partial = supplier_mapper_1.SupplierMapper.toCreateEntity(payload);
        const saved = await this.repository.save(partial);
        return supplier_mapper_1.SupplierMapper.toDomain(saved);
    }
    async updateByExternalId(externalId, payload) {
        const entity = await this.repository.findOne({ where: { externalId } });
        if (!entity)
            return null;
        if (payload.bankAccount !== undefined)
            entity.bankAccount = payload.bankAccount;
        const saved = await this.repository.save(entity);
        return supplier_mapper_1.SupplierMapper.toDomain(saved);
    }
    async deleteByExternalId(externalId) {
        const result = await this.repository.delete({ externalId });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeOrmSupplierRepository = TypeOrmSupplierRepository;
exports.TypeOrmSupplierRepository = TypeOrmSupplierRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(supplier_entity_1.SupplierEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeOrmSupplierRepository);
//# sourceMappingURL=typeorm-supplier.repository.js.map