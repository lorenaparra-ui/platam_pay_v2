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
var SqlProductsCreditFacilitySyncAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlProductsCreditFacilitySyncAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let SqlProductsCreditFacilitySyncAdapter = SqlProductsCreditFacilitySyncAdapter_1 = class SqlProductsCreditFacilitySyncAdapter {
    data_source;
    logger = new common_1.Logger(SqlProductsCreditFacilitySyncAdapter_1.name);
    constructor(data_source) {
        this.data_source = data_source;
    }
    async create_credit_facility(input) {
        const existing = (await this.data_source.query(`SELECT id FROM products_schema.credit_facilities WHERE external_id = $1::uuid LIMIT 1`, [input.credit_facility_external_id]));
        if (existing.length > 0) {
            this.logger.debug(`credit_facility ya existe external_id=${input.credit_facility_external_id}`);
            return { internal_id: existing[0].id };
        }
        let contract_internal_id = null;
        if (input.contract_id !== null && input.contract_id !== undefined) {
            const contract_rows = await this.data_source.query(`SELECT id FROM products_schema.contracts WHERE external_id = $1::uuid LIMIT 1`, [input.contract_id]);
            if (contract_rows.length === 0) {
                throw new Error(`Contrato no encontrado: external_id=${input.contract_id}`);
            }
            contract_internal_id = Number(contract_rows[0].id);
        }
        const rows = (await this.data_source.query(`INSERT INTO products_schema.credit_facilities (
        external_id, contract_id, state, total_limit, business_id
      ) VALUES (
        $1::uuid,
        $2::bigint,
        $3::products_schema.credit_facility_state,
        $4::numeric,
        $5::bigint
      ) RETURNING id`, [
            input.credit_facility_external_id,
            contract_internal_id,
            input.state,
            input.total_limit,
            input.business_id,
        ]));
        return { internal_id: rows[0].id };
    }
    async update_credit_facility_state(credit_facility_external_id, state) {
        await this.data_source.query(`UPDATE products_schema.credit_facilities
         SET state = $2::products_schema.credit_facility_state
       WHERE external_id = $1::uuid`, [credit_facility_external_id, state]);
        this.logger.debug(`credit_facility estado actualizado external_id=${credit_facility_external_id} → ${state}`);
    }
};
exports.SqlProductsCreditFacilitySyncAdapter = SqlProductsCreditFacilitySyncAdapter;
exports.SqlProductsCreditFacilitySyncAdapter = SqlProductsCreditFacilitySyncAdapter = SqlProductsCreditFacilitySyncAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], SqlProductsCreditFacilitySyncAdapter);
//# sourceMappingURL=sql-products-credit-facility-sync.adapter.js.map