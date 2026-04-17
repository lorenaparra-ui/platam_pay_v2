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
exports.TypeormLegalRepresentativeRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const suppliers_data_1 = require("../../../../../../libs/suppliers-data/src");
const legal_representative_mapper_1 = require("../mappers/legal-representative.mapper");
let TypeormLegalRepresentativeRepository = class TypeormLegalRepresentativeRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO suppliers_schema.legal_representatives (
        external_id, business_id, person_id, is_primary
      ) VALUES (gen_random_uuid(), $1, $2, $3)
      RETURNING id, external_id, created_at, updated_at, business_id, person_id, is_primary`, [props.business_id, props.person_id, props.is_primary]);
        return legal_representative_mapper_1.LegalRepresentativeMapper.from_raw_row(rows[0]);
    }
};
exports.TypeormLegalRepresentativeRepository = TypeormLegalRepresentativeRepository;
exports.TypeormLegalRepresentativeRepository = TypeormLegalRepresentativeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suppliers_data_1.LegalRepresentativeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeormLegalRepresentativeRepository);
//# sourceMappingURL=typeorm-legal-representative.repository.js.map