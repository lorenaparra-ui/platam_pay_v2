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
exports.TypeOrmCreditApplicationRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const database_1 = require("@libs/database");
const credit_application_mapper_1 = require("../mappers/credit-application.mapper");
let TypeOrmCreditApplicationRepository = class TypeOrmCreditApplicationRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async findAll() {
        const entities = await this.repository.find({
            order: { createdAt: "DESC" },
        });
        return entities.map((e) => credit_application_mapper_1.CreditApplicationMapper.toDomain(e));
    }
    async findById(id) {
        const entity = await this.repository.findOne({ where: { id } });
        return entity ? credit_application_mapper_1.CreditApplicationMapper.toDomain(entity) : null;
    }
    async findByExternalId(externalId) {
        const entity = await this.repository.findOne({ where: { externalId } });
        return entity ? credit_application_mapper_1.CreditApplicationMapper.toDomain(entity) : null;
    }
    async create(input) {
        const entity = credit_application_mapper_1.CreditApplicationMapper.toEntityFromCreateInput(input);
        const saved = await this.repository.save(entity);
        const full = await this.repository.findOne({ where: { id: saved.id } });
        if (!full)
            throw new Error("Credit application create: row not found after save");
        return credit_application_mapper_1.CreditApplicationMapper.toDomain(full);
    }
    async updateByExternalId(externalId, input) {
        const entity = await this.repository.findOne({ where: { externalId } });
        if (!entity)
            return null;
        if (input.personId !== undefined)
            entity.personId = input.personId;
        if (input.partnerId !== undefined)
            entity.partnerId = input.partnerId;
        if (input.partnerCategoryId !== undefined)
            entity.partnerCategoryId = input.partnerCategoryId;
        if (input.businessId !== undefined)
            entity.businessId = input.businessId;
        if (input.numberOfLocations !== undefined)
            entity.numberOfLocations = input.numberOfLocations;
        if (input.numberOfEmployees !== undefined)
            entity.numberOfEmployees = input.numberOfEmployees;
        if (input.businessSeniority !== undefined)
            entity.businessSeniority = input.businessSeniority;
        if (input.sectorExperience !== undefined)
            entity.sectorExperience = input.sectorExperience;
        if (input.businessFlagshipM2 !== undefined)
            entity.businessFlagshipM2 = input.businessFlagshipM2;
        if (input.businessHasRent !== undefined)
            entity.businessHasRent = input.businessHasRent;
        if (input.businessRentAmount !== undefined)
            entity.businessRentAmount = input.businessRentAmount;
        if (input.monthlyIncome !== undefined)
            entity.monthlyIncome = input.monthlyIncome;
        if (input.monthlyExpenses !== undefined)
            entity.monthlyExpenses = input.monthlyExpenses;
        if (input.monthlyPurchases !== undefined)
            entity.monthlyPurchases = input.monthlyPurchases;
        if (input.currentPurchases !== undefined)
            entity.currentPurchases = input.currentPurchases;
        if (input.totalAssets !== undefined)
            entity.totalAssets = input.totalAssets;
        if (input.requestedCreditLine !== undefined)
            entity.requestedCreditLine = input.requestedCreditLine;
        if (input.isCurrentClient !== undefined)
            entity.isCurrentClient = input.isCurrentClient;
        if (input.statusId != null)
            entity.statusId = input.statusId;
        if (input.submissionDate !== undefined)
            entity.submissionDate = input.submissionDate;
        if (input.approvalDate !== undefined)
            entity.approvalDate = input.approvalDate;
        if (input.rejectionReason !== undefined)
            entity.rejectionReason = input.rejectionReason;
        if (input.creditStudyDate !== undefined)
            entity.creditStudyDate = input.creditStudyDate;
        if (input.creditScore !== undefined)
            entity.creditScore =
                input.creditScore != null ? String(input.creditScore) : null;
        if (input.creditDecision !== undefined)
            entity.creditDecision = input.creditDecision;
        if (input.approvedCreditLine !== undefined)
            entity.approvedCreditLine = input.approvedCreditLine;
        if (input.analystReport !== undefined)
            entity.analystReport = input.analystReport;
        if (input.riskProfile !== undefined)
            entity.riskProfile = input.riskProfile;
        if (input.privacyPolicyAccepted !== undefined)
            entity.privacyPolicyAccepted = input.privacyPolicyAccepted;
        if (input.privacyPolicyDate !== undefined)
            entity.privacyPolicyDate = input.privacyPolicyDate;
        await this.repository.save(entity);
        const updated = await this.repository.findOne({ where: { id: entity.id } });
        return updated ? credit_application_mapper_1.CreditApplicationMapper.toDomain(updated) : null;
    }
    async deleteByExternalId(externalId) {
        const result = await this.repository.delete({ externalId });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeOrmCreditApplicationRepository = TypeOrmCreditApplicationRepository;
exports.TypeOrmCreditApplicationRepository = TypeOrmCreditApplicationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.CreditApplicationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeOrmCreditApplicationRepository);
//# sourceMappingURL=typeorm-credit-application.repository.js.map