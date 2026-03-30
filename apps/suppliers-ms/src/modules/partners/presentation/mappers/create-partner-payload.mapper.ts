import type { CreatePartnerPayloadDto } from '../dto/create-partner-payload.dto';
import type { CreatePartnerOrchestratorCommand } from '@modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.command';

export function map_create_partner_payload_to_command(
  dto: CreatePartnerPayloadDto,
): CreatePartnerOrchestratorCommand {
  return {
    city_id: dto.cityId ?? null,
    entity_type: dto.entityType,
    business_name: dto.businessName ?? null,
    business_address: dto.businessAddress ?? null,
    business_type: dto.businessType ?? null,
    relationship_to_business: dto.relationshipToBusiness ?? null,
    legal_name: dto.legalName ?? null,
    trade_name: dto.tradeName ?? null,
    tax_id: dto.taxId ?? null,
    year_of_establishment: dto.yearOfEstablishment ?? null,
    bank_entity: dto.bankEntity,
    account_number: dto.accountNumber,
    acronym: dto.acronym ?? null,
    secondary_color: dto.secondaryColor ?? null,
    light_color: dto.lightColor ?? null,
    notification_email: dto.notificationEmail ?? null,
    webhook_url: dto.webhookUrl ?? null,
    send_sales_rep_voucher: dto.sendSalesRepVoucher,
    disbursement_notification_email: dto.disbursementNotificationEmail ?? null,
    contract_id: dto.contractId ?? null,
    status_id: dto.statusId,
    total_limit: dto.totalLimit,
    country_code: dto.countryCode ?? null,
    first_name: dto.firstName,
    last_name: dto.lastName,
    doc_type: dto.docType,
    doc_number: dto.docNumber,
    phone: dto.phone ?? null,
    email: dto.email,
    categories: (dto.categories ?? []).map((c) => ({
      name: c.name,
      discount_percentage: c.discountPercentage,
      interest_rate: c.interestRate,
      disbursement_fee_percent: c.disbursementFeePercent ?? null,
      minimum_disbursement_fee: c.minimumDisbursementFee ?? null,
      delay_days: c.delayDays,
      term_days: c.termDays,
    })),
  };
}
