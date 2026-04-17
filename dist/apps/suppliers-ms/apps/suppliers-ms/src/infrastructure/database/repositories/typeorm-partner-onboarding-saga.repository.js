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
exports.TypeormPartnerOnboardingSagaRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const suppliers_data_1 = require("../../../../../../libs/suppliers-data/src");
const SAGA_SELECT = {
    externalId: true,
    correlationId: true,
    status: true,
    currentStep: true,
    creditFacilityExternalId: true,
    userExternalId: true,
    personExternalId: true,
    businessExternalId: true,
    bankAccountExternalId: true,
    partnerExternalId: true,
    errorMessage: true,
};
let TypeormPartnerOnboardingSagaRepository = class TypeormPartnerOnboardingSagaRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create_initial(record) {
        const row = this.repo.create({
            externalId: record.external_id,
            correlationId: record.correlation_id,
            status: record.status,
            currentStep: record.current_step,
        });
        await this.repo.save(row);
    }
    async update_by_external_id(external_id, patch) {
        const existing = await this.repo.findOne({
            where: { externalId: external_id },
        });
        if (!existing) {
            return;
        }
        if (patch.status !== undefined) {
            existing.status = patch.status;
        }
        if (patch.current_step !== undefined) {
            existing.currentStep = patch.current_step;
        }
        if (patch.credit_facility_external_id !== undefined) {
            existing.creditFacilityExternalId = patch.credit_facility_external_id;
        }
        if (patch.user_external_id !== undefined) {
            existing.userExternalId = patch.user_external_id;
        }
        if (patch.person_external_id !== undefined) {
            existing.personExternalId = patch.person_external_id;
        }
        if (patch.business_external_id !== undefined) {
            existing.businessExternalId = patch.business_external_id;
        }
        if (patch.bank_account_external_id !== undefined) {
            existing.bankAccountExternalId = patch.bank_account_external_id;
        }
        if (patch.partner_external_id !== undefined) {
            existing.partnerExternalId = patch.partner_external_id;
        }
        if (patch.error_message !== undefined) {
            existing.errorMessage = patch.error_message;
        }
        await this.repo.save(existing);
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: SAGA_SELECT,
        });
        if (!row)
            return null;
        return {
            external_id: row.externalId,
            correlation_id: row.correlationId,
            status: row.status,
            current_step: row.currentStep,
            credit_facility_external_id: row.creditFacilityExternalId ?? null,
            user_external_id: row.userExternalId ?? null,
            person_external_id: row.personExternalId ?? null,
            business_external_id: row.businessExternalId ?? null,
            bank_account_external_id: row.bankAccountExternalId ?? null,
            partner_external_id: row.partnerExternalId ?? null,
            error_message: row.errorMessage ?? null,
        };
    }
};
exports.TypeormPartnerOnboardingSagaRepository = TypeormPartnerOnboardingSagaRepository;
exports.TypeormPartnerOnboardingSagaRepository = TypeormPartnerOnboardingSagaRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suppliers_data_1.PartnerOnboardingSagaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeormPartnerOnboardingSagaRepository);
//# sourceMappingURL=typeorm-partner-onboarding-saga.repository.js.map