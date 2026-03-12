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
const partner_categories_entity_1 = require("../entities/partner-categories.entity");
const partners_mapper_1 = require("../mappers/partners.mapper");
let TypeOrmPartnersRepository = class TypeOrmPartnersRepository {
    repository;
    dataSource;
    constructor(repository, dataSource) {
        this.repository = repository;
        this.dataSource = dataSource;
    }
    async findAll(search) {
        const trimmedSearch = search?.trim();
        const where = trimmedSearch
            ? [{ acronym: (0, typeorm_2.ILike)(`%${trimmedSearch}%`) }]
            : undefined;
        const partners = await this.repository.find({
            where,
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
    async create(payload) {
        await this.ensureBusinessIdExists(payload.businessId);
        if (payload.statusId !== undefined) {
            await this.ensurePartnerStatusId(payload.statusId);
        }
        return this.dataSource.transaction(async (manager) => {
            const partnersRepository = manager.getRepository(partners_entity_1.PartnersEntity);
            const categoriesRepository = manager.getRepository(partner_categories_entity_1.PartnerCategoriesEntity);
            const createdPartner = await partnersRepository.save(partnersRepository.create({
                businessId: payload.businessId,
                acronym: payload.acronym,
                logoUrl: payload.logoUrl ?? null,
                coBrandingLogoUrl: payload.coBrandingLogoUrl ?? null,
                primaryColor: payload.primaryColor ?? null,
                secondaryColor: payload.secondaryColor ?? null,
                lightColor: payload.lightColor ?? null,
                salesRepRoleName: payload.salesRepRoleName ?? null,
                salesRepRoleNamePlural: payload.salesRepRoleNamePlural ?? null,
                notificationEmail: payload.notificationEmail ?? null,
                webhookUrl: payload.webhookUrl ?? null,
                sendSalesRepVoucher: payload.sendSalesRepVoucher ?? false,
                disbursementNotificationEmail: payload.disbursementNotificationEmail ?? null,
                defaultRepId: payload.defaultRepId ?? null,
                defaultCategoryId: payload.defaultCategoryId ?? null,
                statusId: payload.statusId,
            }));
            if ((payload.categories?.length ?? 0) > 0) {
                const categoriesToCreate = payload.categories.map((category) => categoriesRepository.create({
                    partnerId: createdPartner.id,
                    name: category.name,
                    discountPercentage: category.discountPercentage,
                    interestRate: category.interestRate,
                    disbursementFeePercent: category.disbursementFeePercent ?? null,
                    minimumDisbursementFee: category.minimumDisbursementFee ?? null,
                    delayDays: category.delayDays,
                    termDays: category.termDays,
                }));
                const createdCategories = await categoriesRepository.save(categoriesToCreate);
                if (payload.defaultCategoryId === undefined &&
                    payload.defaultCategoryIndex !== undefined &&
                    createdCategories[payload.defaultCategoryIndex] !== undefined) {
                    createdPartner.defaultCategoryId =
                        createdCategories[payload.defaultCategoryIndex].id;
                    await partnersRepository.save(createdPartner);
                }
            }
            return partners_mapper_1.PartnersMapper.toDomain(createdPartner);
        });
    }
    async updateByExternalId(externalId, payload) {
        if (payload.businessId !== undefined) {
            await this.ensureBusinessIdExists(payload.businessId);
        }
        if (payload.statusId !== undefined) {
            await this.ensurePartnerStatusId(payload.statusId);
        }
        const existing = await this.repository.findOne({ where: { externalId } });
        if (!existing) {
            return null;
        }
        const sanitizedPayload = Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
        Object.assign(existing, sanitizedPayload);
        const updated = await this.repository.save(existing);
        return partners_mapper_1.PartnersMapper.toDomain(updated);
    }
    async deleteByExternalId(externalId) {
        const result = await this.repository.delete({ externalId });
        return (result.affected ?? 0) > 0;
    }
    async setStatusByExternalId(externalId, statusCode) {
        const statusId = await this.resolveStatusId("partners", statusCode);
        if (!statusId) {
            return null;
        }
        const partner = await this.repository.findOne({ where: { externalId } });
        if (!partner) {
            return null;
        }
        partner.statusId = statusId;
        const updated = await this.repository.save(partner);
        return partners_mapper_1.PartnersMapper.toDomain(updated);
    }
    async resolveStatusId(entityType, code) {
        const rawResult = await this.dataSource.query(`SELECT id FROM statuses WHERE entity_type = $1 AND code = $2 AND is_active = true LIMIT 1`, [entityType, code]);
        if (!Array.isArray(rawResult) || rawResult[0] === undefined) {
            return null;
        }
        const rows = rawResult;
        const firstRow = rows[0];
        if (typeof firstRow !== "object" ||
            firstRow === null ||
            !("id" in firstRow)) {
            return null;
        }
        const id = firstRow.id;
        if (typeof id !== "number" && typeof id !== "string") {
            return null;
        }
        return Number(id);
    }
    async ensurePartnerStatusId(statusId) {
        const belongsToPartners = await this.statusIdBelongsToEntity(statusId, "partners");
        if (!belongsToPartners) {
            throw new common_1.BadRequestException(`Invalid statusId ${statusId} for partners entity`);
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
    async ensureBusinessIdExists(businessId) {
        const rawResult = await this.dataSource.query(`SELECT 1 FROM businesses WHERE id = $1 LIMIT 1`, [businessId]);
        if (!Array.isArray(rawResult) || rawResult.length === 0) {
            throw new common_1.BadRequestException(`Invalid businessId ${businessId}`);
        }
    }
};
exports.TypeOrmPartnersRepository = TypeOrmPartnersRepository;
exports.TypeOrmPartnersRepository = TypeOrmPartnersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(partners_entity_1.PartnersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], TypeOrmPartnersRepository);
//# sourceMappingURL=typeorm-partners.repository.js.map