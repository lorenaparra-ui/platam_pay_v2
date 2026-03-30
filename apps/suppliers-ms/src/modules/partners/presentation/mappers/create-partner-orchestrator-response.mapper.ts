import { CreatePartnerOrchestratorResponse } from '@modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.response';
import { CreatePartnerOrchestratorResponseDto } from '../dto/create-partner-orchestrator-response.dto';

export function map_orchestrator_result_to_http(
  res: CreatePartnerOrchestratorResponse,
): CreatePartnerOrchestratorResponseDto {
  const dto = new CreatePartnerOrchestratorResponseDto();
  dto.sagaExternalId = res.saga_external_id;
  dto.correlationId = res.correlation_id;
  dto.creditFacilityExternalId = res.credit_facility_external_id;
  dto.userExternalId = res.user_external_id;
  dto.personExternalId = res.person_external_id;
  dto.businessExternalId = res.business_external_id;
  dto.bankCertificationUrl = res.bank_certification_url;
  dto.logoUrl = res.logo_url;
  dto.coBrandingUrl = res.co_branding_url;
  dto.bankAccountExternalId = res.bank_account_external_id;
  dto.partnerExternalId = res.partner_external_id;
  return dto;
}
