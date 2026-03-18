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
exports.TypeOrmCreditFacilityRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const database_1 = require("@libs/database");
const credit_facility_mapper_1 = require("../mappers/credit-facility.mapper");
let TypeOrmCreditFacilityRepository = class TypeOrmCreditFacilityRepository {
    data_source;
    constructor(data_source) {
        this.data_source = data_source;
    }
    async create_with_categories(input) {
        return this.data_source.transaction(async (manager) => {
            const facility = manager.create(database_1.CreditFacilityEntity, {
                contractId: input.contract_id,
                statusId: input.status_id,
                totalLimit: input.total_limit,
            });
            const saved_facility = await manager.save(database_1.CreditFacilityEntity, facility);
            for (const cat of input.categories) {
                const row = manager.create(database_1.CategoryEntity, {
                    creditFacilityId: saved_facility.id,
                    partnerId: cat.partner_id ?? null,
                    name: cat.name,
                    discountPercentage: cat.discount_percentage,
                    interestRate: cat.interest_rate,
                    disbursementFeePercent: cat.disbursement_fee_percent,
                    minimumDisbursementFee: cat.minimum_disbursement_fee,
                    delayDays: cat.delay_days,
                    termDays: cat.term_days,
                    statusId: cat.status_id,
                });
                await manager.save(database_1.CategoryEntity, row);
            }
            const full = await manager.findOne(database_1.CreditFacilityEntity, {
                where: { id: saved_facility.id },
                relations: { categories: true },
            });
            if (!full) {
                throw new Error("credit_facilities: registro no encontrado tras crear categorías");
            }
            return credit_facility_mapper_1.CreditFacilityMapper.to_domain(full);
        });
    }
};
exports.TypeOrmCreditFacilityRepository = TypeOrmCreditFacilityRepository;
exports.TypeOrmCreditFacilityRepository = TypeOrmCreditFacilityRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], TypeOrmCreditFacilityRepository);
//# sourceMappingURL=typeorm-credit-facility.repository.js.map