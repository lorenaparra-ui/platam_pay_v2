import { IsEnum, IsObject, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export enum TransversalEventType {
  health_ping = 'health_ping',
  partner_onboarding_credit_facility_requested = 'partner_onboarding_credit_facility_requested',
  partner_onboarding_category_batch_requested = 'partner_onboarding_category_batch_requested',
  /** Respuesta de suppliers-ms: negocio creado (o ya existente) para un job de solicitud. */
  credit_application_business_created = 'credit_application_business_created',
  /** Trigger interno: iniciar pipeline de estudio automatizado PN. */
  credit_application_pipeline_start = 'credit_application_pipeline_start',
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
