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
exports.TypeormPartnerRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const suppliers_data_1 = require("../../../../../../libs/suppliers-data/src");
const partner_mapper_1 = require("../mappers/partner.mapper");
const PARTNER_SELECT = {
    id: true,
    externalId: true,
    acronym: true,
    logoUrl: true,
    coBrandingLogoUrl: true,
    primaryColor: true,
    secondaryColor: true,
    lightColor: true,
    notificationEmail: true,
    webhookUrl: true,
    sendSalesRepVoucher: true,
    disbursementNotificationEmail: true,
    state: true,
    createdAt: true,
    updatedAt: true,
    supplier: { id: true },
};
let TypeormPartnerRepository = class TypeormPartnerRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            relations: ['supplier'],
            select: PARTNER_SELECT,
        });
        return row ? partner_mapper_1.PartnerMapper.to_domain(row) : null;
    }
    async find_all() {
        const rows = await this.repo.find({
            relations: ['supplier'],
            select: PARTNER_SELECT,
            order: { id: 'ASC' },
        });
        return rows.map((r) => partner_mapper_1.PartnerMapper.to_domain(r));
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO suppliers_schema.partners (
        supplier_id, external_id, acronym, logo_url, co_branding_logo_url,
        primary_color, secondary_color, light_color,
        notification_email, webhook_url, send_sales_rep_voucher,
        disbursement_notification_email
      ) VALUES (
        $1, gen_random_uuid(), $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      )
      RETURNING id, supplier_id, external_id, acronym, logo_url, co_branding_logo_url,
        primary_color, secondary_color, light_color,
        notification_email, webhook_url, send_sales_rep_voucher,
        disbursement_notification_email, state, created_at, updated_at`, [
            props.supplier_id,
            props.acronym,
            props.logo_url,
            props.co_branding_logo_url,
            props.primary_color,
            props.secondary_color,
            props.light_color,
            props.notification_email,
            props.webhook_url,
            props.send_sales_rep_voucher,
            props.disbursement_notification_email,
        ]);
        return partner_mapper_1.PartnerMapper.from_raw_row(rows[0]);
    }
    async update_by_external_id(external_id, patch) {
        const fields = {};
        if (patch.acronym !== undefined)
            fields.acronym = patch.acronym ?? undefined;
        if (patch.logo_url !== undefined)
            fields.logoUrl = patch.logo_url ?? undefined;
        if (patch.co_branding_logo_url !== undefined)
            fields.coBrandingLogoUrl = patch.co_branding_logo_url ?? undefined;
        if (patch.primary_color !== undefined)
            fields.primaryColor = patch.primary_color ?? undefined;
        if (patch.secondary_color !== undefined)
            fields.secondaryColor = patch.secondary_color ?? undefined;
        if (patch.light_color !== undefined)
            fields.lightColor = patch.light_color ?? undefined;
        if (patch.notification_email !== undefined)
            fields.notificationEmail = patch.notification_email ?? undefined;
        if (patch.webhook_url !== undefined)
            fields.webhookUrl = patch.webhook_url ?? undefined;
        if (patch.send_sales_rep_voucher !== undefined)
            fields.sendSalesRepVoucher = patch.send_sales_rep_voucher;
        if (patch.disbursement_notification_email !== undefined)
            fields.disbursementNotificationEmail =
                patch.disbursement_notification_email ?? undefined;
        if (patch.state !== undefined)
            fields.state = patch.state;
        if (Object.keys(fields).length === 0) {
            return this.find_by_external_id(external_id);
        }
        await this.repo
            .createQueryBuilder()
            .update(suppliers_data_1.PartnerEntity)
            .set({
            ...fields,
            updatedAt: () => 'now()',
        })
            .where('"external_id" = :external_id', { external_id })
            .execute();
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormPartnerRepository = TypeormPartnerRepository;
exports.TypeormPartnerRepository = TypeormPartnerRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suppliers_data_1.PartnerEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeormPartnerRepository);
//# sourceMappingURL=typeorm-partner.repository.js.map