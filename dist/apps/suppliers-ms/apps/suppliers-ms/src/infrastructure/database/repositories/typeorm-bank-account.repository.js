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
exports.TypeormBankAccountRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const suppliers_data_1 = require("../../../../../../libs/suppliers-data/src");
const bank_account_mapper_1 = require("../mappers/bank-account.mapper");
const BANK_ACCOUNT_SELECT = {
    id: true,
    externalId: true,
    bankEntity: true,
    accountNumber: true,
    bankCertification: true,
    createdAt: true,
    updatedAt: true,
};
let TypeormBankAccountRepository = class TypeormBankAccountRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: BANK_ACCOUNT_SELECT,
        });
        return row ? bank_account_mapper_1.BankAccountMapper.to_domain(row) : null;
    }
    async find_all() {
        const rows = await this.repo.find({
            select: BANK_ACCOUNT_SELECT,
            order: { id: 'ASC' },
        });
        return rows.map((r) => bank_account_mapper_1.BankAccountMapper.to_domain(r));
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO suppliers_schema.bank_accounts (
        external_id, bank_entity, account_number, bank_certification
      ) VALUES (gen_random_uuid(), $1, $2, $3)
      RETURNING id, external_id, bank_entity, account_number, bank_certification, created_at, updated_at`, [props.bank_entity, props.account_number, props.bank_certification]);
        return bank_account_mapper_1.BankAccountMapper.from_raw_row(rows[0]);
    }
    async update_by_external_id(external_id, patch) {
        const fields = {};
        if (patch.bank_entity !== undefined)
            fields.bankEntity = patch.bank_entity;
        if (patch.account_number !== undefined)
            fields.accountNumber = patch.account_number;
        if (patch.bank_certification !== undefined)
            fields.bankCertification = patch.bank_certification ?? undefined;
        if (Object.keys(fields).length === 0) {
            return this.find_by_external_id(external_id);
        }
        await this.repo
            .createQueryBuilder()
            .update(suppliers_data_1.BankAccountEntity)
            .set({ ...fields, updatedAt: () => 'now()' })
            .where('"external_id" = :external_id', { external_id })
            .execute();
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormBankAccountRepository = TypeormBankAccountRepository;
exports.TypeormBankAccountRepository = TypeormBankAccountRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suppliers_data_1.BankAccountEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeormBankAccountRepository);
//# sourceMappingURL=typeorm-bank-account.repository.js.map