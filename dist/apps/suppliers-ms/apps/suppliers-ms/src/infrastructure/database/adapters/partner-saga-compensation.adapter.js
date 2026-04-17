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
var PartnerSagaCompensationAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerSagaCompensationAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const suppliers_data_1 = require("../../../../../../libs/suppliers-data/src");
let PartnerSagaCompensationAdapter = PartnerSagaCompensationAdapter_1 = class PartnerSagaCompensationAdapter {
    data_source;
    partner_repo;
    supplier_repo;
    business_repo;
    bank_account_repo;
    logger = new common_1.Logger(PartnerSagaCompensationAdapter_1.name);
    constructor(data_source, partner_repo, supplier_repo, business_repo, bank_account_repo) {
        this.data_source = data_source;
        this.partner_repo = partner_repo;
        this.supplier_repo = supplier_repo;
        this.business_repo = business_repo;
        this.bank_account_repo = bank_account_repo;
    }
    async delete_credit_facility(credit_facility_external_id) {
        try {
            await this.data_source.query(`DELETE FROM products_schema.credit_facilities WHERE external_id = $1::uuid`, [credit_facility_external_id]);
            this.logger.warn(`[Compensación] credit_facility eliminada external_id=${credit_facility_external_id}`);
        }
        catch (err) {
            this.logger.error(`[Compensación] Error al eliminar credit_facility external_id=${credit_facility_external_id}: ${String(err)}`);
        }
    }
    async delete_partner(partner_external_id) {
        try {
            await this.partner_repo.delete({ externalId: partner_external_id });
            this.logger.warn(`[Compensación] partner eliminado external_id=${partner_external_id}`);
        }
        catch (err) {
            this.logger.error(`[Compensación] Error al eliminar partner external_id=${partner_external_id}: ${String(err)}`);
        }
    }
    async delete_supplier(supplier_external_id) {
        try {
            await this.supplier_repo.delete({ externalId: supplier_external_id });
            this.logger.warn(`[Compensación] supplier eliminado external_id=${supplier_external_id}`);
        }
        catch (err) {
            this.logger.error(`[Compensación] Error al eliminar supplier external_id=${supplier_external_id}: ${String(err)}`);
        }
    }
    async delete_business(business_external_id) {
        try {
            await this.business_repo.delete({ externalId: business_external_id });
            this.logger.warn(`[Compensación] business eliminado external_id=${business_external_id}`);
        }
        catch (err) {
            this.logger.error(`[Compensación] Error al eliminar business external_id=${business_external_id}: ${String(err)}`);
        }
    }
    async delete_bank_account(bank_account_external_id) {
        try {
            await this.bank_account_repo.delete({ externalId: bank_account_external_id });
            this.logger.warn(`[Compensación] bank_account eliminado external_id=${bank_account_external_id}`);
        }
        catch (err) {
            this.logger.error(`[Compensación] Error al eliminar bank_account external_id=${bank_account_external_id}: ${String(err)}`);
        }
    }
};
exports.PartnerSagaCompensationAdapter = PartnerSagaCompensationAdapter;
exports.PartnerSagaCompensationAdapter = PartnerSagaCompensationAdapter = PartnerSagaCompensationAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(suppliers_data_1.PartnerEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(suppliers_data_1.SupplierEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(suppliers_data_1.BusinessEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(suppliers_data_1.BankAccountEntity)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PartnerSagaCompensationAdapter);
//# sourceMappingURL=partner-saga-compensation.adapter.js.map