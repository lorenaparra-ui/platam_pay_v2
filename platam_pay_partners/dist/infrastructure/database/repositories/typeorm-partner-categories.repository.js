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
exports.TypeOrmPartnerCategoriesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const partner_categories_entity_1 = require("../entities/partner-categories.entity");
const partner_categories_mapper_1 = require("../mappers/partner-categories.mapper");
const partners_entity_1 = require("../entities/partners.entity");
let TypeOrmPartnerCategoriesRepository = class TypeOrmPartnerCategoriesRepository {
    categoriesRepository;
    partnersRepository;
    dataSource;
    constructor(categoriesRepository, partnersRepository, dataSource) {
        this.categoriesRepository = categoriesRepository;
        this.partnersRepository = partnersRepository;
        this.dataSource = dataSource;
    }
    async findAll(partnerExternalId) {
        if (partnerExternalId !== undefined) {
            return this.findByPartnerExternalId(partnerExternalId);
        }
        const categories = await this.categoriesRepository.find({
            order: { createdAt: "DESC" },
        });
        return categories.map((category) => partner_categories_mapper_1.PartnerCategoriesMapper.toDomain(category));
    }
    async findByExternalId(externalId) {
        const category = await this.categoriesRepository.findOne({
            where: { externalId },
        });
        if (!category) {
            return null;
        }
        return partner_categories_mapper_1.PartnerCategoriesMapper.toDomain(category);
    }
    async findByPartnerExternalId(partnerExternalId) {
        const partner = await this.partnersRepository.findOne({
            where: { externalId: partnerExternalId },
            select: { id: true },
        });
        if (!partner) {
            return [];
        }
        const categories = await this.categoriesRepository.find({
            where: { partnerId: partner.id },
            order: { createdAt: "ASC" },
        });
        return categories.map((category) => partner_categories_mapper_1.PartnerCategoriesMapper.toDomain(category));
    }
    async create(payload) {
        if (payload.statusId !== undefined) {
            await this.ensurePartnerCategoryStatusId(payload.statusId);
        }
        const partner = await this.partnersRepository.findOne({
            where: { externalId: payload.partnerExternalId },
            select: { id: true },
        });
        if (!partner) {
            return null;
        }
        const created = await this.categoriesRepository.save(this.categoriesRepository.create({
            partnerId: partner.id,
            name: payload.name,
            discountPercentage: payload.discountPercentage,
            interestRate: payload.interestRate,
            disbursementFeePercent: payload.disbursementFeePercent ?? null,
            minimumDisbursementFee: payload.minimumDisbursementFee ?? null,
            delayDays: payload.delayDays,
            termDays: payload.termDays,
            statusId: payload.statusId,
        }));
        return partner_categories_mapper_1.PartnerCategoriesMapper.toDomain(created);
    }
    async updateByExternalId(externalId, payload) {
        if (payload.statusId !== undefined) {
            await this.ensurePartnerCategoryStatusId(payload.statusId);
        }
        const existing = await this.categoriesRepository.findOne({
            where: { externalId },
        });
        if (!existing) {
            return null;
        }
        const sanitizedPayload = Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
        Object.assign(existing, sanitizedPayload);
        const updated = await this.categoriesRepository.save(existing);
        return partner_categories_mapper_1.PartnerCategoriesMapper.toDomain(updated);
    }
    async deleteByExternalId(externalId) {
        const result = await this.categoriesRepository.delete({ externalId });
        return (result.affected ?? 0) > 0;
    }
    async ensurePartnerCategoryStatusId(statusId) {
        const belongsToPartnerCategories = await this.statusIdBelongsToEntity(statusId, "partner_categories");
        if (!belongsToPartnerCategories) {
            throw new common_1.BadRequestException(`Invalid statusId ${statusId} for partner_categories entity`);
        }
    }
    async statusIdBelongsToEntity(statusId, entityType) {
        const rawResult = await this.dataSource.query(`SELECT 1
       FROM statuses
       WHERE id = $1
         AND entity_type = $2
         AND is_active = true
       LIMIT 1`, [statusId, entityType]);
        return Array.isArray(rawResult) && rawResult.length > 0;
    }
};
exports.TypeOrmPartnerCategoriesRepository = TypeOrmPartnerCategoriesRepository;
exports.TypeOrmPartnerCategoriesRepository = TypeOrmPartnerCategoriesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(partner_categories_entity_1.PartnerCategoriesEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(partners_entity_1.PartnersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], TypeOrmPartnerCategoriesRepository);
//# sourceMappingURL=typeorm-partner-categories.repository.js.map