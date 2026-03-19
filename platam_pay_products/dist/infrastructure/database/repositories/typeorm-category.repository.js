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
exports.TypeOrmCategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const database_1 = require("@libs/database");
const category_mapper_1 = require("../mappers/category.mapper");
let TypeOrmCategoryRepository = class TypeOrmCategoryRepository {
    data_source;
    constructor(data_source) {
        this.data_source = data_source;
    }
    async create(input) {
        const repo = this.data_source.getRepository(database_1.CategoryEntity);
        const row = repo.create({
            creditFacilityId: input.credit_facility_id,
            partnerId: input.partner_id ?? null,
            name: input.name,
            discountPercentage: input.discount_percentage,
            interestRate: input.interest_rate,
            disbursementFeePercent: input.disbursement_fee_percent,
            minimumDisbursementFee: input.minimum_disbursement_fee,
            delayDays: input.delay_days,
            termDays: input.term_days,
            statusId: input.status_id,
        });
        const saved = await repo.save(row);
        const full = await repo.findOne({ where: { id: saved.id } });
        if (!full)
            throw new Error("categories: fila no encontrada tras crear");
        return category_mapper_1.CategoryMapper.to_domain(full);
    }
    async create_bulk(credit_facility_id, items) {
        return this.data_source.transaction(async (manager) => {
            const repo = manager.getRepository(database_1.CategoryEntity);
            const out = [];
            for (const it of items) {
                const row = repo.create({
                    creditFacilityId: credit_facility_id,
                    partnerId: it.partner_id ?? null,
                    name: it.name,
                    discountPercentage: it.discount_percentage,
                    interestRate: it.interest_rate,
                    disbursementFeePercent: it.disbursement_fee_percent,
                    minimumDisbursementFee: it.minimum_disbursement_fee,
                    delayDays: it.delay_days,
                    termDays: it.term_days,
                    statusId: it.status_id,
                });
                const saved = await repo.save(row);
                const full = await repo.findOne({ where: { id: saved.id } });
                if (!full)
                    throw new Error("categories: error en creación masiva");
                out.push(category_mapper_1.CategoryMapper.to_domain(full));
            }
            return out;
        });
    }
    async find_by_external_id(external_id) {
        const repo = this.data_source.getRepository(database_1.CategoryEntity);
        const row = await repo.findOne({ where: { externalId: external_id } });
        return row ? category_mapper_1.CategoryMapper.to_domain(row) : null;
    }
    async find_by_credit_facility_id(credit_facility_id) {
        const repo = this.data_source.getRepository(database_1.CategoryEntity);
        const rows = await repo.find({
            where: { creditFacilityId: credit_facility_id },
            order: { id: "ASC" },
        });
        return rows.map((r) => category_mapper_1.CategoryMapper.to_domain(r));
    }
    async update_by_external_id(external_id, input) {
        const repo = this.data_source.getRepository(database_1.CategoryEntity);
        const row = await repo.findOne({ where: { externalId: external_id } });
        if (!row)
            return null;
        if (input.partner_id !== undefined)
            row.partnerId = input.partner_id;
        if (input.name !== undefined)
            row.name = input.name;
        if (input.delay_days !== undefined)
            row.delayDays = input.delay_days;
        if (input.disbursement_fee_percent !== undefined)
            row.disbursementFeePercent = input.disbursement_fee_percent;
        if (input.discount_percentage !== undefined)
            row.discountPercentage = input.discount_percentage;
        if (input.interest_rate !== undefined)
            row.interestRate = input.interest_rate;
        if (input.minimum_disbursement_fee !== undefined)
            row.minimumDisbursementFee = input.minimum_disbursement_fee;
        if (input.term_days !== undefined)
            row.termDays = input.term_days;
        if (input.status_id !== undefined)
            row.statusId = input.status_id;
        await repo.save(row);
        const full = await repo.findOne({ where: { id: row.id } });
        return full ? category_mapper_1.CategoryMapper.to_domain(full) : null;
    }
    async delete_by_external_id(external_id) {
        const repo = this.data_source.getRepository(database_1.CategoryEntity);
        const result = await repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeOrmCategoryRepository = TypeOrmCategoryRepository;
exports.TypeOrmCategoryRepository = TypeOrmCategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], TypeOrmCategoryRepository);
//# sourceMappingURL=typeorm-category.repository.js.map