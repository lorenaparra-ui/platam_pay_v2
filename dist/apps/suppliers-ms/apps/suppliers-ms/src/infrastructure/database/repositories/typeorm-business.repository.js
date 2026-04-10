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
exports.TypeormBusinessRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const suppliers_data_1 = require("../../../../../../libs/suppliers-data/src");
const business_mapper_1 = require("../mappers/business.mapper");
const BUSINESS_SELECT = {
    id: true,
    externalId: true,
    personId: true,
    cityId: true,
    entityType: true,
    businessName: true,
    businessAddress: true,
    businessType: true,
    relationshipToBusiness: true,
    legalName: true,
    tradeName: true,
    taxId: true,
    yearOfEstablishment: true,
    createdAt: true,
    updatedAt: true,
};
let TypeormBusinessRepository = class TypeormBusinessRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: BUSINESS_SELECT,
        });
        return row ? business_mapper_1.BusinessMapper.to_domain(row) : null;
    }
    async find_all() {
        const rows = await this.repo.find({
            select: BUSINESS_SELECT,
            order: { id: 'ASC' },
        });
        return rows.map((r) => business_mapper_1.BusinessMapper.to_domain(r));
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO suppliers_schema.businesses (
        external_id, person_id, city_id, entity_type, business_name, business_address,
        business_type, relationship_to_business, legal_name, trade_name, tax_id, year_of_establishment
      ) VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, external_id, created_at, updated_at, person_id, city_id, entity_type,
        business_name, business_address, business_type, relationship_to_business,
        legal_name, trade_name, tax_id, year_of_establishment`, [
            props.person_id,
            props.city_id,
            props.entity_type,
            props.business_name,
            props.business_address,
            props.business_type,
            props.relationship_to_business,
            props.legal_name,
            props.trade_name,
            props.tax_id,
            props.year_of_establishment,
        ]);
        return business_mapper_1.BusinessMapper.from_raw_row(rows[0]);
    }
    async update_by_external_id(external_id, patch) {
        const existing = await this.repo.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        if (!existing) {
            return null;
        }
        const columns = [];
        const values = [];
        let i = 1;
        const add = (col, val) => {
            columns.push(`"${col}" = $${i}`);
            values.push(val);
            i += 1;
        };
        if (patch.person_id !== undefined) {
            add('person_id', patch.person_id);
        }
        if (patch.city_id !== undefined) {
            add('city_id', patch.city_id);
        }
        if (patch.entity_type !== undefined) {
            add('entity_type', patch.entity_type);
        }
        if (patch.business_name !== undefined) {
            add('business_name', patch.business_name);
        }
        if (patch.business_address !== undefined) {
            add('business_address', patch.business_address);
        }
        if (patch.business_type !== undefined) {
            add('business_type', patch.business_type);
        }
        if (patch.relationship_to_business !== undefined) {
            add('relationship_to_business', patch.relationship_to_business);
        }
        if (patch.legal_name !== undefined) {
            add('legal_name', patch.legal_name);
        }
        if (patch.trade_name !== undefined) {
            add('trade_name', patch.trade_name);
        }
        if (patch.tax_id !== undefined) {
            add('tax_id', patch.tax_id);
        }
        if (patch.year_of_establishment !== undefined) {
            add('year_of_establishment', patch.year_of_establishment);
        }
        if (columns.length === 0) {
            return this.find_by_external_id(external_id);
        }
        columns.push(`"updated_at" = now()`);
        values.push(existing.id);
        await this.repo.query(`UPDATE suppliers_schema.businesses SET ${columns.join(', ')} WHERE id = $${i}`, values);
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormBusinessRepository = TypeormBusinessRepository;
exports.TypeormBusinessRepository = TypeormBusinessRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suppliers_data_1.BusinessEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeormBusinessRepository);
//# sourceMappingURL=typeorm-business.repository.js.map