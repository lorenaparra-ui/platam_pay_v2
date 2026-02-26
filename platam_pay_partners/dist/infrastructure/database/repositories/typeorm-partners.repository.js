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
exports.TypeOrmPartnersRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const partners_entity_1 = require("../entities/partners.entity");
const partners_mapper_1 = require("../mappers/partners.mapper");
let TypeOrmPartnersRepository = class TypeOrmPartnersRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async findAll() {
        const partners = await this.repository.find({
            order: { createdAt: "DESC" },
        });
        return partners.map((partner) => partners_mapper_1.PartnersMapper.toDomain(partner));
    }
    async findById(id) {
        const partner = await this.repository.findOne({ where: { id } });
        if (!partner) {
            return null;
        }
        return partners_mapper_1.PartnersMapper.toDomain(partner);
    }
    async findByExternalId(externalId) {
        const partner = await this.repository.findOne({ where: { externalId } });
        if (!partner) {
            return null;
        }
        return partners_mapper_1.PartnersMapper.toDomain(partner);
    }
};
exports.TypeOrmPartnersRepository = TypeOrmPartnersRepository;
exports.TypeOrmPartnersRepository = TypeOrmPartnersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(partners_entity_1.PartnersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeOrmPartnersRepository);
//# sourceMappingURL=typeorm-partners.repository.js.map