import { IsEnum, IsObject, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export enum TransversalEventType {
  health_ping = 'health_ping',
  partner_onboarding_user_upsert_requested = 'partner_onboarding_user_upsert_requested',
  partner_onboarding_person_upsert_requested = 'partner_onboarding_person_upsert_requested',
  partner_onboarding_files_upload_requested = 'partner_onboarding_files_upload_requested',
  partner_onboarding_credit_facility_requested = 'partner_onboarding_credit_facility_requested',
  partner_onboarding_category_batch_requested = 'partner_onboarding_category_batch_requested',
}

/**
 * Carga útil publicada hacia SQS (serializada a JSON en el caso de uso).
 */
export class TransversalOutboundEventDto {
  @IsUUID('4')
  correlation_id!: string;

  @IsEnum(TransversalEventType)
  event_type!: TransversalEventType;

  @IsObject()
  payload!: Record<string, unknown>;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  trace_id?: string;
}
