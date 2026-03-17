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
exports.TypeOrmSalesRepresentativeRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sales_representative_entity_1 = require("../entities/sales-representative.entity");
const sales_representative_mapper_1 = require("../mappers/sales-representative.mapper");
let TypeOrmSalesRepresentativeRepository = class TypeOrmSalesRepresentativeRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async findAll() {
        const entities = await this.repository.find({
            order: { partnerId: "ASC", name: "ASC" },
        });
        return entities.map(sales_representative_mapper_1.SalesRepresentativeMapper.toDomain);
    }
    async findById(id) {
        const entity = await this.repository.findOne({ where: { id } });
        return entity ? sales_representative_mapper_1.SalesRepresentativeMapper.toDomain(entity) : null;
    }
    async findByExternalId(externalId) {
        const entity = await this.repository.findOne({ where: { externalId } });
        return entity ? sales_representative_mapper_1.SalesRepresentativeMapper.toDomain(entity) : null;
    }
    async findByPartnerId(partnerId) {
        const entities = await this.repository.find({
            where: { partnerId },
            order: { name: "ASC" },
        });
        return entities.map(sales_representative_mapper_1.SalesRepresentativeMapper.toDomain);
    }
    async findByUserId(userId) {
        const entity = await this.repository.findOne({ where: { userId } });
        return entity ? sales_representative_mapper_1.SalesRepresentativeMapper.toDomain(entity) : null;
    }
    async create(payload) {
        const entity = sales_representative_mapper_1.SalesRepresentativeMapper.toCreateEntity(payload);
        const saved = await this.repository.save(entity);
        return sales_representative_mapper_1.SalesRepresentativeMapper.toDomain(saved);
    }
};
exports.TypeOrmSalesRepresentativeRepository = TypeOrmSalesRepresentativeRepository;
exports.TypeOrmSalesRepresentativeRepository = TypeOrmSalesRepresentativeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sales_representative_entity_1.SalesRepresentativeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeOrmSalesRepresentativeRepository);
//# sourceMappingURL=typeorm-sales-representative.repository.js.map