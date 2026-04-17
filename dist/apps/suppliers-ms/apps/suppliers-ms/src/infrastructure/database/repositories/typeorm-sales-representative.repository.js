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
exports.TypeormSalesRepresentativeRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const suppliers_data_1 = require("../../../../../../libs/suppliers-data/src");
const sales_representative_mapper_1 = require("../mappers/sales-representative.mapper");
let TypeormSalesRepresentativeRepository = class TypeormSalesRepresentativeRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    with_user_graph_qb() {
        return this.repo
            .createQueryBuilder('sr')
            .leftJoinAndSelect('sr.user', 'u')
            .leftJoinAndSelect('u.person', 'p')
            .leftJoinAndSelect('u.role', 'r');
    }
    async find_by_external_id(external_id) {
        const row = await this.with_user_graph_qb()
            .where('sr.external_id = :external_id', { external_id })
            .getOne();
        return row ? sales_representative_mapper_1.SalesRepresentativeMapper.to_domain(row) : null;
    }
    async find_all(partner_id_filter) {
        const qb = this.with_user_graph_qb().orderBy('sr.id', 'ASC');
        if (partner_id_filter !== undefined) {
            qb.andWhere('sr.partner_id = :partner_id', {
                partner_id: partner_id_filter,
            });
        }
        const rows = await qb.getMany();
        return rows.map((r) => sales_representative_mapper_1.SalesRepresentativeMapper.to_domain(r));
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO suppliers_schema.sales_representatives (
        external_id, partner_id, user_id
      ) VALUES (gen_random_uuid(), $1, $2)
      RETURNING id, external_id, partner_id, user_id, created_at, updated_at`, [props.partner_id, props.user_id]);
        return sales_representative_mapper_1.SalesRepresentativeMapper.from_raw_row(rows[0]);
    }
    async update_user_by_external_id(external_id, user_id) {
        const qb = this.repo
            .createQueryBuilder()
            .update(suppliers_data_1.SalesRepresentativeEntity)
            .where('"external_id" = :external_id', { external_id });
        if (user_id === null) {
            await qb
                .set({
                userId: () => 'NULL',
                updatedAt: () => 'now()',
            })
                .execute();
        }
        else {
            await qb
                .set({
                userId: user_id,
                updatedAt: () => 'now()',
            })
                .execute();
        }
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormSalesRepresentativeRepository = TypeormSalesRepresentativeRepository;
exports.TypeormSalesRepresentativeRepository = TypeormSalesRepresentativeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suppliers_data_1.SalesRepresentativeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeormSalesRepresentativeRepository);
//# sourceMappingURL=typeorm-sales-representative.repository.js.map