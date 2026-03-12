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
var RegisterPartnerUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterPartnerUseCase = void 0;
const common_1 = require("@nestjs/common");
const create_partner_user_port_1 = require("../../domain/ports/create-partner-user.port");
const file_storage_port_1 = require("../../domain/ports/file-storage.port");
const create_business_use_case_1 = require("../../../businesses/application/use-cases/create-business.use-case");
const create_partner_use_case_1 = require("./create-partner.use-case");
let RegisterPartnerUseCase = RegisterPartnerUseCase_1 = class RegisterPartnerUseCase {
    createPartnerUserPort;
    fileStorage;
    createBusinessUseCase;
    createPartnerUseCase;
    logger = new common_1.Logger(RegisterPartnerUseCase_1.name);
    constructor(createPartnerUserPort, fileStorage, createBusinessUseCase, createPartnerUseCase) {
        this.createPartnerUserPort = createPartnerUserPort;
        this.fileStorage = fileStorage;
        this.createBusinessUseCase = createBusinessUseCase;
        this.createPartnerUseCase = createPartnerUseCase;
    }
    async execute(body, files) {
        const city_id = this.parseCityId(body.cityId);
        this.logger.debug("Paso 1: Crear usuario con rol partner");
        const { user_id } = await this.createPartnerUserPort.createPartnerUser({
            first_name: body.firstName,
            last_name: body.lastName,
            document_type: body.documentType,
            document_number: body.documentNumber,
            email: body.email,
            phone: body.phone,
        });
        this.logger.debug("Paso 2: Crear business");
        const businessResponse = await this.createBusinessUseCase.execute({
            userId: user_id,
            cityId: city_id,
            entityType: "PJ",
            businessName: body.tradeName ?? body.legalName ?? null,
            businessAddress: body.businessAddress ?? null,
            businessType: null,
            relationshipToBusiness: null,
            legalName: body.legalName ?? null,
            tradeName: body.tradeName ?? null,
            taxId: body.taxId ?? null,
            yearOfEstablishment: body.yearOfEstablishment ?? null,
        });
        this.logger.debug("Paso 3: Subir logos");
        const logo_url = await this.uploadLogoIfPresent(files.logo, body.acronym, "logo");
        const co_branding_logo_url = await this.uploadLogoIfPresent(files.co_branding_logo, body.acronym, "cobranding");
        this.logger.debug("Paso 4: Crear partner y categorías");
        const partnerPayload = {
            businessId: businessResponse.id,
            acronym: body.acronym,
            logoUrl: logo_url ?? null,
            coBrandingLogoUrl: co_branding_logo_url ?? null,
            primaryColor: body.primaryColor ?? null,
            secondaryColor: body.secondaryColor ?? null,
            lightColor: body.lightColor ?? null,
            notificationEmail: body.notificationEmail ?? null,
            webhookUrl: body.webhookUrl ?? null,
            sendSalesRepVoucher: body.sendSalesRepVoucher ?? false,
            disbursementNotificationEmail: body.disbursementNotificationEmail ?? null,
            defaultRepId: null,
            defaultCategoryId: undefined,
            statusId: undefined,
            categories: this.mapCategories(body),
            defaultCategoryIndex: body.defaultCategoryIndex,
        };
        return this.createPartnerUseCase.execute(partnerPayload);
    }
    parseCityId(cityId) {
        const n = Number(cityId);
        return Number.isNaN(n) || n < 1 ? null : n;
    }
    async uploadLogoIfPresent(file, acronym, suffix) {
        if (!file?.buffer?.length)
            return null;
        const key = `partners/${acronym}/${suffix}-${Date.now()}`;
        const result = await this.fileStorage.upload({
            key,
            body: file.buffer,
            content_type: file.mimetype,
        });
        return result.location;
    }
    mapCategories(body) {
        return body.categories?.map((c) => ({
            name: c.name,
            discountPercentage: c.discountPercentage,
            interestRate: c.interestRate,
            disbursementFeePercent: c.disbursementFeePercent ?? null,
            minimumDisbursementFee: c.minimumDisbursementFee ?? null,
            delayDays: c.delayDays,
            termDays: c.termDays,
        }));
    }
};
exports.RegisterPartnerUseCase = RegisterPartnerUseCase;
exports.RegisterPartnerUseCase = RegisterPartnerUseCase = RegisterPartnerUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(create_partner_user_port_1.CREATE_PARTNER_USER_PORT)),
    __param(1, (0, common_1.Inject)(file_storage_port_1.FILE_STORAGE_PORT)),
    __metadata("design:paramtypes", [Object, Object, create_business_use_case_1.CreateBusinessUseCase,
        create_partner_use_case_1.CreatePartnerUseCase])
], RegisterPartnerUseCase);
//# sourceMappingURL=register-partner.use-case.js.map