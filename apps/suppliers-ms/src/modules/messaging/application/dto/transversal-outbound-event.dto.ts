import { Expose } from 'class-transformer';
import { IsEnum, IsObject, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export enum TransversalEventType {
  health_ping = 'health_ping',
  /** Alta de partner: solicitud de provisión de usuario/persona (transversal-ms). */
  partner_onboarding_user_upsert_requested = 'partner_onboarding_user_upsert_requested',
  partner_onboarding_person_upsert_requested = 'partner_onboarding_person_upsert_requested',
  partner_onboarding_files_upload_requested = 'partner_onboarding_files_upload_requested',
  /** Publicación hacia products-ms (mismo contrato JSON en SQS). */
  partner_onboarding_credit_facility_requested = 'partner_onboarding_credit_facility_requested',
  partner_onboarding_category_batch_requested = 'partner_onboarding_category_batch_requested',
  /** Solicitud de creación de negocio para un job de solicitud de crédito (products-ms → suppliers-ms). */
  credit_application_business_requested = 'credit_application_business_requested',
}

/**
 * Carga útil publicada hacia SQS (serializada a JSON en el caso de uso).
 * Propiedades TypeScript en camelCase; el JSON en cola sigue usando snake_case.
 */
export class TransversalOutboundEventDto {
  @Expose({ name: 'correlation_id' })
  @IsUUID('4')
  correlationId!: string;

  @Expose({ name: 'event_type' })
  @IsEnum(TransversalEventType)
  eventType!: TransversalEventType;

  @Expose()
  @IsObject()
  payload!: Record<string, unknown>;

  @Expose({ name: 'trace_id' })
  @IsOptional()
  @IsString()
  @MaxLength(256)
  traceId?: string;
}
