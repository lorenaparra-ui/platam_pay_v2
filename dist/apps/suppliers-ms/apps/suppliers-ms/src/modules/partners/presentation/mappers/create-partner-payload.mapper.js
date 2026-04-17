"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map_create_partner_payload_to_command = map_create_partner_payload_to_command;
const UUID_V4_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function trim_or_null(s) {
    if (s === null || s === undefined) {
        return null;
    }
    const t = s.trim();
    return t.length > 0 ? t : null;
}
function pick_city_external_id_from_business(b) {
    const primary = trim_or_null(b.cityId ?? null);
    const legacy = trim_or_null(b.cityExternalId ?? null);
    if (primary !== null && UUID_V4_RE.test(primary)) {
        return primary;
    }
    if (legacy !== null && UUID_V4_RE.test(legacy)) {
        return legacy;
    }
    return null;
}
function phone_from_payload(v) {
    if (v === null || v === undefined) {
        return null;
    }
    if (typeof v === 'number' && Number.isFinite(v)) {
        return String(Math.trunc(v));
    }
    const t = String(v).trim();
    return t.length > 0 ? t : null;
}
function tax_id_from_payload(v) {
    return trim_or_null(v ?? null);
}
function map_create_partner_payload_to_command(dto, defaults) {
    const country_from_dto = trim_or_null(dto.countryCode ?? null);
    const country_code = country_from_dto !== null ? country_from_dto : defaults.country_code;
    const lr = dto.business.legalRepresentative;
    const legal_representative = lr === null || lr === undefined
        ? null
        : {
            first_name: lr.firstName,
            last_name: lr.lastName,
            doc_type: lr.docType,
            doc_number: lr.docNumber,
            phone: phone_from_payload(lr.phone ?? null),
            email: lr.email,
        };
    return {
        city_id: pick_city_external_id_from_business(dto.business),
        entity_type: dto.business.entityType,
        business_name: dto.business.businessName ?? null,
        business_address: dto.business.businessAddress ?? null,
        business_type: dto.business.businessType ?? null,
        relationship_to_business: null,
        legal_name: dto.business.legalName ?? null,
        trade_name: dto.business.tradeName ?? null,
        tax_id: tax_id_from_payload(dto.business.taxId),
        year_of_establishment: dto.business.yearOfEstablishment ?? null,
        bank_entity: dto.bankAccount.bankEntity,
        account_number: dto.bankAccount.accountNumber.trim(),
        acronym: dto.partner.acronym ?? null,
        primary_color: dto.partner.primaryColor ?? null,
        secondary_color: dto.partner.secondaryColor ?? null,
        light_color: dto.partner.lightColor ?? null,
        notification_email: dto.partner.notificationEmail ?? null,
        webhook_url: dto.partner.webhookUrl ?? null,
        send_sales_rep_voucher: dto.partner.sendSalesRepVoucher ?? false,
        disbursement_notification_email: dto.partner.disbursementNotificationEmail ?? null,
        contract_id: trim_or_null(dto.creditFacility.contractId ?? null),
        total_limit: dto.creditFacility.totalLimit.trim(),
        country_code,
        first_name: dto.operatingUser.firstName,
        last_name: dto.operatingUser.lastName,
        doc_type: dto.operatingUser.docType,
        doc_number: dto.operatingUser.docNumber,
        phone: phone_from_payload(dto.operatingUser.phone ?? null),
        email: dto.operatingUser.email,
        legal_representative,
        categories: dto.category.map((c) => ({
            name: c.name,
            discount_percentage: String(c.discountPercentage),
            interest_rate: String(c.interestRate),
            disbursement_fee_percent: c.disbursementFeePercent !== null && c.disbursementFeePercent !== undefined
                ? String(c.disbursementFeePercent)
                : null,
            minimum_disbursement_fee: c.minimumDisbursementFee !== null && c.minimumDisbursementFee !== undefined
                ? String(c.minimumDisbursementFee)
                : null,
            delay_days: c.delayDays,
            term_days: c.termDays,
        })),
    };
}
//# sourceMappingURL=create-partner-payload.mapper.js.map