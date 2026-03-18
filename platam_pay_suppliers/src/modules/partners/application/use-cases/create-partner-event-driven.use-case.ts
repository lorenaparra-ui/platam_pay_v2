import { Inject, Injectable, Logger } from "@nestjs/common";
import { BUSINESS_REPOSITORY } from "@businesses/domain/ports/business.repository.port";
import type { BusinessRepositoryPort, CreateBusinessPayload } from "@businesses/domain/ports/business.repository.port";
import { PARTNERS_REPOSITORY } from "@partners/domain/ports/partner.repository.port";
import type { CreatePartnerPayload, PartnerRepositoryPort } from "@partners/domain/ports/partner.repository.port";
import { PARTNER_EVENTS } from "@partners/domain/events/partner.events";
import type { PartnerLogoUploadCompletedPayload } from "@partners/domain/events/partner.events";
import { EVENT_BUS_PORT } from "@partners/domain/ports/event-bus.port";
import type { EventBusPort } from "@partners/domain/ports/event-bus.port";
import { Partner } from "@partners/domain/models/partner.model";
import type { CreatePartnerFullRequestDto } from "../dto/create-partner-full-request.dto";
import { randomUUID } from "node:crypto";

const PLACEHOLDER_USER_ID_FOR_PARTNER_BUSINESS = 1;

@Injectable()
export class CreatePartnerEventDrivenUseCase {
  private readonly logger = new Logger(CreatePartnerEventDrivenUseCase.name);

  constructor(
    @Inject(BUSINESS_REPOSITORY)
    private readonly businessRepository: BusinessRepositoryPort,
    @Inject(PARTNERS_REPOSITORY)
    private readonly partnerRepository: PartnerRepositoryPort,
    @Inject(EVENT_BUS_PORT)
    private readonly eventBus: EventBusPort,
  ) {}

  async execute(
    dto: CreatePartnerFullRequestDto,
    files: { logo: { buffer: Buffer; mimetype: string; originalname: string }; coBrandingLogo: { buffer: Buffer; mimetype: string; originalname: string } },
  ): Promise<Partner> {
    const correlationId = randomUUID();

    const businessPayload: CreateBusinessPayload = {
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
      name: PARTNER_EVENTS.LOGO_UPLOAD_REQUESTED,
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

    const completed = await this.eventBus.waitFor!<PartnerLogoUploadCompletedPayload>(
      PARTNER_EVENTS.LOGO_UPLOAD_COMPLETED,
      correlationId,
      { timeoutMs: 30_000 },
    );
    const logoUrls = completed.payload as PartnerLogoUploadCompletedPayload;

    const partnerPayload: CreatePartnerPayload = {
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
      name: PARTNER_EVENTS.CATEGORIES_CREATE_REQUESTED,
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
      name: PARTNER_EVENTS.USER_CREATE_REQUESTED,
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
}
