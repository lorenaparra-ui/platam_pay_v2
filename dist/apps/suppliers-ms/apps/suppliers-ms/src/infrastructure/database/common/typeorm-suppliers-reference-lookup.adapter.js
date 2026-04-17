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
exports.TypeormSuppliersReferenceLookupAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transversal_data_1 = require("../../../../../../libs/transversal-data/src");
const suppliers_data_1 = require("../../../../../../libs/suppliers-data/src");
let TypeormSuppliersReferenceLookupAdapter = class TypeormSuppliersReferenceLookupAdapter {
    users;
    persons;
    cities;
    businesses;
    bank_accounts;
    partners;
    suppliers;
    constructor(users, persons, cities, businesses, bank_accounts, partners, suppliers) {
        this.users = users;
        this.persons = persons;
        this.cities = cities;
        this.businesses = businesses;
        this.bank_accounts = bank_accounts;
        this.partners = partners;
        this.suppliers = suppliers;
    }
    async get_user_internal_id_by_external_id(external_id) {
        const row = await this.users.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        return row?.id ?? null;
    }
    async get_person_internal_id_by_external_id(external_id) {
        const row = await this.persons.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        return row?.id ?? null;
    }
    async get_city_internal_id_by_external_id(external_id) {
        const row = await this.cities.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        return row?.id ?? null;
    }
    async get_business_internal_id_by_external_id(external_id) {
        const row = await this.businesses.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        return row?.id ?? null;
    }
    async get_partner_internal_id_by_external_id(external_id) {
        const row = await this.partners.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        return row?.id ?? null;
    }
    async get_partner_external_id_by_internal_id(internal_id) {
        const row = await this.partners.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
    async get_user_external_id_by_internal_id(internal_id) {
        const row = await this.users.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
    async get_person_external_id_by_internal_id(internal_id) {
        const row = await this.persons.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
    async get_city_external_id_by_internal_id(internal_id) {
        const row = await this.cities.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
    async get_business_external_id_by_internal_id(internal_id) {
        const row = await this.businesses.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
    async get_bank_account_external_id_by_internal_id(internal_id) {
        const row = await this.bank_accounts.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
    async get_bank_account_internal_id_by_external_id(external_id) {
        const row = await this.bank_accounts.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        return row?.id ?? null;
    }
    async get_supplier_external_id_by_internal_id(internal_id) {
        const row = await this.suppliers.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
};
exports.TypeormSuppliersReferenceLookupAdapter = TypeormSuppliersReferenceLookupAdapter;
exports.TypeormSuppliersReferenceLookupAdapter = TypeormSuppliersReferenceLookupAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transversal_data_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(transversal_data_1.PersonEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(transversal_data_1.CityEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(suppliers_data_1.BusinessEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(suppliers_data_1.BankAccountEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(suppliers_data_1.PartnerEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(suppliers_data_1.SupplierEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TypeormSuppliersReferenceLookupAdapter);
//# sourceMappingURL=typeorm-suppliers-reference-lookup.adapter.js.map