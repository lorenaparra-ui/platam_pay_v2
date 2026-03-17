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
var CreatePartnerEventDrivenUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePartnerEventDrivenUseCase = void 0;
const common_1 = require("@nestjs/common");
const business_repository_port_1 = require("../../../businesses/domain/ports/business.repository.port");
const partner_repository_port_1 = require("../../domain/ports/partner.repository.port");
const partner_events_1 = require("../../domain/events/partner.events");
const event_bus_port_1 = require("../../domain/ports/event-bus.port");
const node_crypto_1 = require("node:crypto");
const PLACEHOLDER_USER_ID_FOR_PARTNER_BUSINESS = 1;
let CreatePartnerEventDrivenUseCase = CreatePartnerEventDrivenUseCase_1 = class CreatePartnerEventDrivenUseCase {
    businessRepository;
    partnerRepository;
    eventBus;
    logger = new common_1.Logger(CreatePartnerEventDrivenUseCase_1.name);
    constructor(businessRepository, partnerRepository, eventBus) {
        this.businessRepository = businessRepository;
        this.partnerRepository = partnerRepository;
        this.eventBus = eventBus;
    }
    async execute(dto, files) {
        const correlationId = (0, node_crypto_1.randomUUID)();
        const businessPayload = {
            userId: PLACEHOLDER_USER_ID_FOR_PARTNER_BUSINESS,
            cityId: parseInt(dto.cityId, 10) || null,
            entityType: "PJ",
            businessName: dto.tradeName,
            businessAddress: dto.businessAddress,
            legalName: dto.legalName,
            tradeName: dto.tradeName,
            taxId: dto.taxId,
            yearOfEstablishment: dto.yearOfEstablishment,
        };
        const business = await this.businessRepository.create(businessPayload);
        this.logger.log(`Business created id=${business.id} externalId=${business.externalId}`);
        this.eventBus.publish({
            name: partner_events_1.PARTNER_EVENTS.LOGO_UPLOAD_REQUESTED,
            payload: {
                correlation_id: correlationId,
                business_id: business.id,
                business_external_id: business.externalId,
                logo_buffer: files.logo.buffer,
                logo_content_type: files.logo.mimetype,
                logo_filename: files.logo.originalname,
                co_branding_logo_buffer: files.coBrandingLogo.buffer,
                co_branding_logo_content_type: files.coBrandingLogo.mimetype,
                co_branding_logo_filename: files.coBrandingLogo.originalname,
            },
            occurred_at: new Date().toISOString(),
            correlation_id: correlationId,
        });
        const completed = await this.eventBus.waitFor(partner_events_1.PARTNER_EVENTS.LOGO_UPLOAD_COMPLETED, correlationId, { timeoutMs: 30_000 });
        const logoUrls = completed.payload;
        const partnerPayload = {
            businessId: business.id,
            acronym: dto.acronym,
            logoUrl: logoUrls.logo_url,
            coBrandingLogoUrl: logoUrls.co_branding_logo_url,
            primaryColor: dto.primaryColor ?? null,
            secondaryColor: dto.secondaryColor ?? null,
            lightColor: dto.lightColor ?? null,
            notificationEmail: dto.notificationEmail,
            webhookUrl: dto.webhookUrl ?? null,
            sendSalesRepVoucher: dto.sendSalesRepVoucher,
            disbursementNotificationEmail: dto.disbursementNotificationEmail ?? null,
        };
        const partner = await this.partnerRepository.create(partnerPayload);
        this.logger.log(`Partner created id=${partner.id} externalId=${partner.externalId}`);
        this.eventBus.publish({
            name: partner_events_1.PARTNER_EVENTS.CATEGORIES_CREATE_REQUESTED,
            payload: {
                correlation_id: correlationId,
                partner_id: partner.id,
                partner_external_id: partner.externalId,
                business_id: business.id,
                categories: dto.categories.map((c) => ({
                    name: c.name,
                    term_days: c.termDays,
                    delay_days: c.delayDays,
                    discount_percentage: c.discountPercentage,
                    interest_rate: c.interestRate,
                    disbursement_fee_percent: c.disbursementFeePercent,
                    minimum_disbursement_fee: c.minimumDisbursementFee,
                })),
            },
            occurred_at: new Date().toISOString(),
            correlation_id: correlationId,
        });
        this.eventBus.publish({
            name: partner_events_1.PARTNER_EVENTS.USER_CREATE_REQUESTED,
            payload: {
                correlation_id: correlationId,
                partner_external_id: partner.externalId,
                business_id: business.id,
                first_name: dto.firstName,
                last_name: dto.lastName,
                document_type: dto.documentType,
                document_number: dto.documentNumber,
                email: dto.email,
                phone: dto.phone ?? "",
            },
            occurred_at: new Date().toISOString(),
            correlation_id: correlationId,
        });
        return partner;
    }
};
exports.CreatePartnerEventDrivenUseCase = CreatePartnerEventDrivenUseCase;
exports.CreatePartnerEventDrivenUseCase = CreatePartnerEventDrivenUseCase = CreatePartnerEventDrivenUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(business_repository_port_1.BUSINESS_REPOSITORY)),
    __param(1, (0, common_1.Inject)(partner_repository_port_1.PARTNERS_REPOSITORY)),
    __param(2, (0, common_1.Inject)(event_bus_port_1.EVENT_BUS_PORT)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreatePartnerEventDrivenUseCase);
//# sourceMappingURL=create-partner-event-driven.use-case.js.map