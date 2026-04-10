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
exports.TypeormSupplierRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const suppliers_data_1 = require("../../../../../../libs/suppliers-data/src");
const supplier_mapper_1 = require("../mappers/supplier.mapper");
const SUPPLIER_ORM_SELECT = {
    id: true,
    externalId: true,
    businessId: true,
    createdAt: true,
    updatedAt: true,
};
let TypeormSupplierRepository = class TypeormSupplierRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async load_bank_account_id(supplier_id) {
        const rows = await this.repo.query(`SELECT bank_account_id FROM suppliers_schema.suppliers WHERE id = $1`, [supplier_id]);
        const r = rows[0];
        return r?.bank_account_id ?? null;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: SUPPLIER_ORM_SELECT,
        });
        if (!row) {
            return null;
        }
        const bank_account_id = await this.load_bank_account_id(row.id);
        return supplier_mapper_1.SupplierMapper.to_domain(row, bank_account_id);
    }
    async find_all() {
        const rows = await this.repo.find({
            select: SUPPLIER_ORM_SELECT,
            order: { id: 'ASC' },
        });
        const out = [];
        for (const row of rows) {
            const bank_account_id = await this.load_bank_account_id(row.id);
            out.push(supplier_mapper_1.SupplierMapper.to_domain(row, bank_account_id));
        }
        return out;
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO suppliers_schema.suppliers (
        external_id, business_id, bank_account_id
      ) VALUES (gen_random_uuid(), $1, $2)
      RETURNING id, external_id, business_id, bank_account_id, created_at, updated_at`, [props.business_id, props.bank_account_id]);
        return supplier_mapper_1.SupplierMapper.from_raw_row(rows[0]);
    }
    async update_by_external_id(external_id, patch) {
        const existing = await this.repo.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        if (!existing) {
            return null;
        }
        if (patch.bank_account_id === undefined) {
            return this.find_by_external_id(external_id);
        }
        await this.repo.query(`UPDATE suppliers_schema.suppliers SET bank_account_id = $1, updated_at = now() WHERE id = $2`, [patch.bank_account_id, existing.id]);
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormSupplierRepository = TypeormSupplierRepository;
exports.TypeormSupplierRepository = TypeormSupplierRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suppliers_data_1.SupplierEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeormSupplierRepository);
//# sourceMappingURL=typeorm-supplier.repository.js.map