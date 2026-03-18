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
exports.TypeOrmPurchaseOrderRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const database_1 = require("@libs/database");
const purchase_order_mapper_1 = require("../mappers/purchase-order.mapper");
let TypeOrmPurchaseOrderRepository = class TypeOrmPurchaseOrderRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async findAll() {
        const entities = await this.repository.find({
            order: { createdAt: "DESC" },
        });
        return entities.map(purchase_order_mapper_1.PurchaseOrderMapper.toDomain);
    }
    async findById(id) {
        const entity = await this.repository.findOne({ where: { id } });
        return entity ? purchase_order_mapper_1.PurchaseOrderMapper.toDomain(entity) : null;
    }
    async findByExternalId(externalId) {
        const entity = await this.repository.findOne({ where: { externalId } });
        return entity ? purchase_order_mapper_1.PurchaseOrderMapper.toDomain(entity) : null;
    }
    async findBySupplierId(supplierId) {
        const entities = await this.repository.find({
            where: { supplierId },
            order: { createdAt: "DESC" },
        });
        return entities.map(purchase_order_mapper_1.PurchaseOrderMapper.toDomain);
    }
    async create(payload) {
        const partial = purchase_order_mapper_1.PurchaseOrderMapper.toCreateEntity(payload);
        const saved = await this.repository.save(partial);
        return purchase_order_mapper_1.PurchaseOrderMapper.toDomain(saved);
    }
};
exports.TypeOrmPurchaseOrderRepository = TypeOrmPurchaseOrderRepository;
exports.TypeOrmPurchaseOrderRepository = TypeOrmPurchaseOrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.PurchaseOrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeOrmPurchaseOrderRepository);
//# sourceMappingURL=typeorm-purchase-order.repository.js.map